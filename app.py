from flask import Flask, request, jsonify, render_template, send_file
import os
import threading
import time
import cv2
import numpy as np
from PIL import Image
import shutil
import joblib
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import datetime
#from flask_cors import CORS
from flask_cors import CORS
from flask import send_from_directory

app = Flask(__name__, template_folder='templates', static_folder='static')
#CORS(app)
CORS(app)
# Model Paths
CNN_MODEL_PATH = 'pattern_classifier_aditya11.h5'
MLP_MODEL_PATH = 'mlp_best_model_88800.pkl'
NLP_MODEL_PATH = 'nltk_sequence_anomaly_detector.h5'

# Load Models
cnn_model = load_model(CNN_MODEL_PATH)
mlp_model = joblib.load(MLP_MODEL_PATH)
nlp_model = load_model(NLP_MODEL_PATH)

# Constants
IMG_WIDTH, IMG_HEIGHT = 64, 64
OUTPUT_DIR = 'extracted_characters'
 # Constants
OUTPUT_DIR = "output"
IMAGE_PATH = "uploaded_image.jpg"  # Shared path for the uploaded image
TEMP_RESULT = "result_summary.json"    # Temporary file for storing result summary


# Constants and paths
IMAGE_PATH = "uploaded_image.jpg"
TEMP_RESULT = "result_summary.json"
OUTPUT_DIR = "output"
PDF_FILE_PATH = "detailed_report.pdf"
 

@app.route('/')
def serve_react():
    return send_from_directory("build", "index.html")

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory("build", path)

# Helper Functions
def preprocess_for_mlp(img):
    return img.reshape(1, -1) / 255.0

def preprocess_for_cnn(img):
    img = cv2.resize(img, (IMG_WIDTH, IMG_HEIGHT))
    img = img.reshape(1, IMG_WIDTH, IMG_HEIGHT, 1).astype('float32') / 255.0
    return img



def detect_sequence_anomaly(seq):
    max_sequence_length = max(5, len(seq))  # Adjust padding size dynamically

    # Tokenize the sequence
    tokenizer = Tokenizer(char_level=True)
    tokenizer.fit_on_texts([seq])
    seq_idx = tokenizer.texts_to_sequences([seq])[0]

    # Create padded sequence
    padded_seq = np.zeros((1, max_sequence_length), dtype=int)
    padded_seq[0, :len(seq_idx)] = seq_idx

    # Dummy logic for anomaly detection
    if len(seq) > 10:  # Example condition
        return "Anomaly detected: Sequence too long."
    return "No anomalies detected."



def extract_characters(image_path):
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    _, binary_img = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=lambda c: cv2.boundingRect(c)[0])

    char_count = 0
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        char_img = binary_img[y:y+h, x:x+w]
        char_img = cv2.resize(char_img, (28, 28))
        pil_img = Image.fromarray(char_img)
        char_img_name = os.path.join(OUTPUT_DIR, f'char_{char_count}.png')
        pil_img.save(char_img_name)
        char_count += 1

def preprocess_for_cnn(img):
    # Resize to (64, 64)
    img = cv2.resize(img, (64, 64))
    # Expand grayscale to 3 channels (if needed)
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    # Normalize pixel values to [0, 1]
    img = img.astype('float32') / 255.0
    # Add batch dimension
    return np.expand_dims(img, axis=0)



def generate_pdf_report(result_summary, output_file='detailed_report.pdf'):
    c = canvas.Canvas(output_file, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 16)
    c.drawString(200, height - 50, "Dyslexia Detection Report")
    c.setFont("Helvetica", 10)
    c.drawString(450, height - 70, f"Generated on: {datetime.datetime.now()}")

    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 100, "Summary of Results:")
    c.setFont("Helvetica", 12)
    c.drawString(70, height - 130, f"Total Characters Processed: {result_summary['total_characters']}")
    c.drawString(70, height - 150, f"Reversal Count: {result_summary['reversal_count']}")
    c.drawString(70, height - 170, f"Normal Count: {result_summary['normal_count']}")
    c.drawString(70, height - 190, f"Final Detection Result: {result_summary['final_result']}")
    c.drawString(70, height - 210, f"Sequence Analysis: {result_summary['anomaly_result']}")

    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 240, "Detailed Character Analysis:")
    y_position = height - 270
    for char_data in result_summary['detailed_characters']:
        c.setFont("Helvetica", 12)
        c.drawString(70, y_position, f"Character: {char_data['character']} | Dyslexia Detection: {char_data['detection']}")
        y_position -= 20
        if y_position < 50:
            c.showPage()
            y_position = height - 50

    c.save()
    return output_file

# Routes
@app.route('/')
def index():
    return render_template('index.html')

def predict_image(img_path, model):
    img = image.load_img(img_path, target_size=(IMG_WIDTH, IMG_HEIGHT))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = model.predict(img_array)
    return 'Normal' if prediction < 0.5 else 'Reversal'

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    image_path = 'uploaded_image.jpg'
    uploaded_file.save(image_path)
    

    try:
        extract_characters(image_path)
        predictions_array = []
        image_files = [f for f in os.listdir(OUTPUT_DIR) if f.endswith('.png')]

        for img_file in image_files:
            img_path = os.path.join(OUTPUT_DIR, img_file)
            prediction = predict_image(img_path, cnn_model)
            predictions_array.append(prediction)

        count = predictions_array.count('Reversal')
        normal_count = predictions_array.count('Normal')

        if count > normal_count:
            result = "Dyslexia Detected"
        else:
            result = "Dyslexia Not Detected, Normal reports"

    finally:
        if os.path.exists(OUTPUT_DIR):
            shutil.rmtree(OUTPUT_DIR)
    
    return jsonify({'result': result})

@app.route('/process-image', methods=['POST'])
def process_image_and_generate_report():
    # Check if an image file was uploaded
    if 'file' in request.files:
        uploaded_file = request.files['file']
        if uploaded_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Save the uploaded file temporarily
        uploaded_file.save(IMAGE_PATH)
    elif not os.path.exists(IMAGE_PATH):
        return jsonify({'error': 'No image uploaded to process'}), 400

    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Read and process the image
    img = cv2.imread(IMAGE_PATH, cv2.IMREAD_GRAYSCALE)
    _, binary_img = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=lambda c: cv2.boundingRect(c)[0])

    char_count = 0
    predicted_text = []
    detailed_characters = []

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        char_img = binary_img[y:y + h, x:x + w]
        char_img = cv2.resize(char_img, (28, 28))
        char_img_name = os.path.join(OUTPUT_DIR, f'char_{char_count}.png')
        Image.fromarray(char_img).save(char_img_name)

        # Predict using MLP
        mlp_prediction = mlp_model.predict(preprocess_for_mlp(char_img))
        predicted_character = chr(mlp_prediction[0] + 97)
        predicted_text.append(predicted_character)

        # Preprocess for CNN model
        preprocessed_img = preprocess_for_cnn(char_img)
        dyslexia_result = cnn_model.predict(preprocessed_img)
        dyslexia_label = "Dyslexic Pattern" if dyslexia_result[0][0] > 0.5 else "Normal"

        detailed_characters.append({
            'character': predicted_character,
            'detection': dyslexia_label
        })
        char_count += 1

    # Summarize results
    final_text = ''.join(predicted_text)
    anomaly_result = detect_sequence_anomaly(final_text)
    reversal_count = sum(1 for c in detailed_characters if c['detection'] == 'Dyslexic Pattern')
    normal_count = len(detailed_characters) - reversal_count
    final_result = "Normal" if normal_count > reversal_count else "Dyslexic"

    result_summary = {
        'total_characters': char_count,
        'reversal_count': reversal_count,
        'normal_count': normal_count,
        'final_result': final_result,
        'anomaly_result': anomaly_result,
        'detailed_characters': detailed_characters
    }

    # Save result summary for later use
    with open(TEMP_RESULT, 'w') as f:
        f.write(str(result_summary))

    return jsonify(result_summary), 200


# Function to generate the PDF report
def generate_pdf_report(result_summary, output_file=PDF_FILE_PATH):
    c = canvas.Canvas(output_file, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 16)
    c.drawString(200, height - 50, "Dyslexia Detection Report")
    c.setFont("Helvetica", 10)
    c.drawString(450, height - 70, f"Generated on: {datetime.datetime.now()}")

    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 100, "Summary of Results:")
    c.setFont("Helvetica", 12)
    c.drawString(70, height - 130, f"Total Characters Processed: {result_summary['total_characters']}")
    c.drawString(70, height - 150, f"Reversal Count: {result_summary['reversal_count']}")
    c.drawString(70, height - 170, f"Normal Count: {result_summary['normal_count']}")
    c.drawString(70, height - 190, f"Final Detection Result: {result_summary['final_result']}")
    c.drawString(70, height - 210, f"Sequence Analysis: {result_summary['anomaly_result']}")

    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 240, "Detailed Character Analysis:")
    y_position = height - 270
    for char_data in result_summary['detailed_characters']:
        c.setFont("Helvetica", 12)
        c.drawString(70, y_position, f"Character: {char_data['character']} | Dyslexia Detection: {char_data['detection']}")
        y_position -= 20
        if y_position < 50:
            c.showPage()
            y_position = height - 50

    c.save()
    return output_file

# Route for downloading the report
@app.route('/download-report', methods=['GET'])
def download_report():

    process_image_and_generate_report()
    if not os.path.exists(TEMP_RESULT):
        return jsonify({'error': 'No processed data available for report'}), 400

    # Load the result summary
    with open(TEMP_RESULT, 'r') as f:
        result_summary = eval(f.read())

    # Generate PDF report
    pdf_file = generate_pdf_report(result_summary)

    # Start a background thread to delete the files after 5 seconds
    files_to_delete = [pdf_file, TEMP_RESULT, IMAGE_PATH]
    threading.Thread(target=delete_files_after_delay, args=(files_to_delete, 50)).start()

    # Send the PDF file to the user
    return send_file(pdf_file, as_attachment=True)
# Function to delete files after 5 seconds
def delete_files_after_delay(files, delay):
    """
    Deletes the specified files after a delay.
    """
    time.sleep(delay)
    for file in files:
        if os.path.exists(file):
            try:
                os.remove(file)
                print(f"Deleted: {file}")
            except Exception as e:
                print(f"Error deleting {file}: {e}")
        else:
            print(f"File not found: {file}")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5173, debug=True)
