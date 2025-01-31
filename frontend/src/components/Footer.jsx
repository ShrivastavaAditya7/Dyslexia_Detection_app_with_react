import React from 'react';
import GithubButton from './GithubButton';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Early Dyslexia Detection. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          
          <a 
            href="https://github.com/ShrivastavaAditya7/Dyslexia_Detection_Assistance" 
          >
           <GithubButton/>
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          Built with ❤️ by three passionate developers. Powered by curiosity, hardwork , and conssitency .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
