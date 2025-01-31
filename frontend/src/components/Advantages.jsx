import React from 'react'
import AdvantageCard from "./AdvantageCard"

const Advantages = ({ isDarkMode }) => {

    const cardData = [
        {
            title: "Fast",
            description: "Our dyslexia detection tool delivers results in a matter of seconds. With advanced AI technology, you can quickly upload handwriting samples and receive actionable insights without delays, saving valuable time.",
            icon: "ri-timer-flash-fill",
        },
        {
            title: "Medically Verified",
            description: "Our solution is backed by research and validated by experts, ensuring that the assessments align with medically recognized standards. Trustworthy and credible, it’s designed to support informed decision-making.",
            icon: "ri-mental-health-fill",
        },
        {
            title: "Accurate",
            description: "Leveraging cutting-edge NLP and machine learning, our Model ensures precision 99.76% in identifying potential signs of dyslexia. Its high accuracy provides reliable data, empowering educators and parents with confidence.",
            icon: "ri-crosshair-2-line",
        }
    ];

    return (
        <div className="-mt-1 px-6 md:px-20 py-10 bg-blue-50 dark:bg-gray-900">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">Advantages</h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                {cardData.map((card, index) => (
                    <AdvantageCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default Advantages;
