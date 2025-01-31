let selectedFile = null;

// Custom cursor behavior
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.pageX}px`;
    cursor.style.top = `${event.pageY}px`;
});

// Add cursor size change when hovering over specific elements
const expandCursorElements = document.querySelectorAll('button, .instruction-box');

expandCursorElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-expanded');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-expanded');
    });
});

// File upload behavior
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('upload').click();
});

// Handle file upload and detection button
document.getElementById('detectButton').addEventListener('click', async () => {
    if (!selectedFile) {
        alert('Please upload an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    showLoader();

    // Send the image to your backend endpoint
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        hideLoader();

        const resultText = document.getElementById('resultText');
        if (result.result === "Dyslexia Detected") {
            resultText.style.color = 'red';
            resultText.style.fontSize = '1.5rem';
            resultText.style.fontWeight = 'bold';
            /*resultText.style.textShadow = '2px 2px 5px rgba(255, 0, 0, 0.7)';*/
            resultText.innerText = 'Dyslexia Detected';
        } else if (result.result === "Dyslexia Not Detected, Normal reports") {
            resultText.style.color = 'green';
            resultText.style.fontSize = '1.5rem';
            resultText.style.fontWeight = 'bold';
         /*   resultText.style.textShadow = '2px 2px 5px rgba(0, 255, 0, 0.7)';*/
            resultText.innerText = 'Dyslexia Not Detected, Normal reports';
        } else {
            resultText.style.color = 'black';
            resultText.innerText = `Result: ${result.result || 'No dyslexia detected.'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        hideLoader();
        document.getElementById('resultText').innerText = 'Error: Could not retrieve result.';
    }
});

// Trigger the hidden file input to upload an image
document.getElementById('upload').addEventListener('change', function (event) {
    selectedFile = event.target.files[0];
    document.getElementById('resultText').innerText = `Image uploaded: ${selectedFile.name}`;
});

// Show loader and hide result text when processing
function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('resultBox').style.display = 'none';
}

// Hide loader and show result text when done
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('resultBox').style.display = 'block';
}
 // Typing Effect Function
 function typeEffect(element, text, speed = 50) {
    let i = 0;
    const cursor = document.createElement("span");
    cursor.classList.add("typing-cursor");
    element.appendChild(cursor);

    function typeCharacter() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
            setTimeout(typeCharacter, speed);
        } else {
            cursor.remove(); // Remove cursor after typing finishes
        }
    }
    typeCharacter();
}

// Target elements and texts
const headings = [
    { id: "mainHeading", text: "Enhancing Accessibility: NLP for Assistive Technology" },
    { id: "description", text: "Our Dyslexia Detection tool leverages advanced AI and Natural Language Processing (NLP) techniques to analyze handwriting samples for potential signs of dyslexia. This innovative solution is designed to aid educators, parents, and professionals in identifying reading and writing challenges early, paving the way for tailored support and intervention.\n\nWith just a simple upload of a handwritten text image, the tool provides actionable insights. Early detection is crucial for fostering a supportive environment and offering resources that cater to individual needs, enhancing confidence and learning outcomes for those with dyslexia.\n\nThis website embodies the mission to make accessibility universal and empower individuals to unlock their full potential." }
];

// Apply typing effect
document.addEventListener("DOMContentLoaded", () => {
    headings.forEach(({ id, text }) => {
        const element = document.getElementById(id);
        if (element) typeEffect(element, text, 115);
    });
});
