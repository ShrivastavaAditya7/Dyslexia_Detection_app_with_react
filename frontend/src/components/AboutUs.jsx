import React from 'react';
import AboutUsCard from './AboutUsCard';

const AboutUs = ({ isDarkMode }) => {
    const AboutUsData=[
        {name:"Aditya Shrivastav",
            description:"Backend lead Builds robust server-side systems, managing databases and secure APIs.",
            github:"https://github.com/ShrivastavaAditya7",
            linkedin:"https://www.linkedin.com/in/aditya-shrivastava-24291424a/",
            instagram:"https://www.instagram.com/shri.aditya7/",
            twitter:"https://x.com/",
            imageSrc:"https://png.pngtree.com/thumb_back/fw800/background/20240211/pngtree-illustrated-cartoon-handsome-boy-with-curl-hair-image_15625926.jpg"
        },
        {name:"Baaqar Naqi",
            description:"AIML expert Crafts intelligent AI solutions, enhancing data-driven insights and user experiences",
            github:"https://github.com/Baaqar-007",
            linkedin:"https://www.linkedin.com/in/baaqar-naqi-910332217/",
            instagram:"https://www.instagram.com/baaqarnaqi/",
            twitter:"https://x.com/",
            imageSrc:"https://img.freepik.com/premium-photo/cute-handsome-anime-boy-illustration_962508-52183.jpg?w=740"},
        {name:"Dhruv Jain",
            description:"Fullstack Developer and Frontend lead Develops scalable, user-friendly web applications, leveraging modern frameworks.",
            github:"https://github.com/dhruvjain-github",
            linkedin:"https://www.linkedin.com/in/dhruv-jain-714434255/",
            instagram:"https://instagram.com/d.h.r.u.v__05/",
            twitter:"https://x.com/Dhruvjain_tweet",
            imageSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUN9alpbYQEf17P-hmEzYoey7ORRZGB21Cg&s"
            }]
  return (
    <div className="px-6 md:px-20 py-10 bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
      <p className="text-base md:text-lg leading-relaxed mb-6">
        Welcome to our website, a platform created by three passionate developers who share a deep curiosity for 
        technology, NLP, and development. Our mission is to harness the power of cutting-edge innovations to 
        build solutions that are impactful and accessible to everyone.
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
      <p className="text-base md:text-lg leading-relaxed mb-6">
        We aim to push boundaries in the tech world by blending creativity with technical expertise. By focusing on 
        meaningful projects like this, we hope to inspire and empower users to explore and benefit from the latest 
        advancements in technology.
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-8">Our Team</h2>
      
      <div className='flex flex-col md:flex-row justify-center items-center gap-16'>
        {AboutUsData.map((data, index) => (
            <AboutUsCard key={index} data={data}
                name={ data.name}
                description={data.description}
                github={data.github}
                linkedin={data.linkedin}
                instagram={data.instagram}
                twitter={data.twitter} 
                imageSrc={data.imageSrc}
                isDarkMode={isDarkMode}/>
            ))}
      </div>
      <p className="text-base font-semibold md:text-lg leading-relaxed mt-6">
        Together, we work tirelessly to bring our ideas to life, guided by our shared passion for technology and a commitment 
        to making a difference.
      </p>
    </div>
  );
};

export default AboutUs;
