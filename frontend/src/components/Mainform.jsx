import React, { useState } from 'react';
import Loader2 from './Loader2';

const Mainform = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload an image first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    setLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5173/upload', {  // Flask backend URL
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      setLoading(false);
  
      if (result.result === 'Dyslexia Detected') {
        setResult('Dyslexia Detected');
        document.getElementById('resultText').style.color = 'red';
      } else if (result.result === 'Dyslexia Not Detected, Normal reports') {
        setResult('Dyslexia Not Detected, Normal reports');
        document.getElementById('resultText').style.color = 'green';
      } else {
        setResult(result.result || 'No dyslexia detected.');
        document.getElementById('resultText').style.color = 'black';
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setResult('Error: Could not retrieve result.');
    }
  };
  

  return (
    <div className="py-16 flex items-center justify-center bg-blue-50 dark:bg-gray-900 ">
      <div className="w-full mx-5 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:border-2 border border-blue-500 relative p-6">
        <div className="absolute inset-0 rounded-xl blur-lg bg-blue-500/30 opacity-50 animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Dyslexia Detection
          </h1>
          <div className="space-y-4">
            <button
              id="uploadButton"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition"
              onClick={() => document.getElementById('upload').click()}
            >
              📤 Upload Image
            </button>
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                alert(`Image uploaded: ${e.target.files[0]?.name || 'None'}`);
              }}
            />
            <button
              id="detectButton"
              className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600 transition"
              onClick={HandleSubmit}
            >
              🔍 Find Dyslexia
            </button>
            <button className="w-full bg-gray-700 text-white font-medium py-2 rounded hover:bg-gray-800 transition">
              <a href="/download-report" className="block">
                Download Report
              </a>
            </button>
          </div>
          <div
            id="resultBox"
            className={`mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded text-center text-gray-800 dark:text-white ${
              result ? '' : 'hidden'
            }`}
          >
            <p id="resultText">{result || 'Result will appear here.'}</p>
          </div>
          <div
            id="loader"
            className={`mt-6 flex justify-center items-center text-gray-700 dark:text-gray-300 ${
              loading ? '' : 'hidden'
            }`}
          >
            <Loader2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainform;
