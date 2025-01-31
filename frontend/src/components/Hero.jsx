import React from 'react';
import KnowmoreButton from './KnowmoreButton';
import Loader from './Loader';

const Hero = () => {
  return (
    <div className="-mt-1 px-6 md:px-20 py-10 bg-blue-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Welcome</h1>
      <div className="space-y-6">
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          <li>
            Our Dyslexia Detection tool leverages advanced AI and Natural Language Processing (NLP) techniques 
            to analyze handwriting samples for potential signs of dyslexia. This innovative solution is designed 
            to aid educators, parents, and professionals in identifying reading and writing challenges early, 
            paving the way for tailored support and intervention.
          </li>
          <li>
            With just a simple upload of a handwritten text image, the tool provides actionable insights. Early 
            detection is crucial for fostering a supportive environment and offering resources that cater to 
            individual needs, enhancing confidence and learning outcomes for those with dyslexia.
          </li>
          <li>
            This website embodies the mission to make accessibility universal and empower individuals to unlock 
            their full potential.
          </li>
        </ul>
        
      </div>
      <h3 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mt-10  mb-4">About Dyslexia</h3>
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed font-semibold mb-10">
          Dyslexia is a learning disorder that primarily affects reading, writing, and spelling skills. It is not 
          related to intelligence but stems from differences in how the brain processes language. With early 
          identification and the right support, individuals with dyslexia can achieve their full potential.
        </p>
        <div className='w-full md:opacity-0 opacity-100 flex justify-center items-center  -mb-32 mt-5'>
        <KnowmoreButton />
        </div>
        <div className='w-full flex justify-between items-center opacity-0 md:opacity-100 mt-20'>
        <div className='md:-ml-2 '>
        <KnowmoreButton />
        </div>
        <div className="md:opacity-100 opacity-0">
        <Loader />
        </div>
        
        </div>
    </div>
  );
};

export default Hero;
