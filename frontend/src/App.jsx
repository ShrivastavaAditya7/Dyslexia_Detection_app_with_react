import React, { useState } from 'react';
import Header from "./components/Header";
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import HowtoUse from './components/HowtoUse';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Mainform from './components/Mainform';



const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <Header setIsDarkMode={setIsDarkMode} />
      <Hero />
      <Advantages isDarkMode={isDarkMode}/>
      <HowtoUse/>
      <Mainform/>
      <AboutUs isDarkMode={isDarkMode}/>
      <Footer/>
    </div>
  );
}

export default App;