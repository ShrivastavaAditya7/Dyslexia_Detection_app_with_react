import React from 'react';
import Switch from './Switch';

const Header = ({ setIsDarkMode }) => {
  return (
    <header className=" bg-blue-100 dark:bg-gray-800 p-6  border-b-2 border-gray-300 flex justify-between items-start">
      <div className='md:ml-20 md:mt-10'>
        <h1 className="text-3xl md:text-4xl text-gray-800 dark:text-white font-bold text-left">Early Dyslexia Detection</h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-500 mt-2 text-left">Unlocking Potential for Lifelong Success</p>
      </div>

      <div className='mt-10 md:mr-10'>
        <Switch setIsDarkMode={setIsDarkMode} /> 
      </div>
    </header>
  );
};

export default Header;