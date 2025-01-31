import React from 'react';

const HowtoUse = () => {
  return (
    <div className=" px-6 md:px-20 py-10 bg-blue-50 dark:bg-gray-900">
      <h1 className=" mt-10 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Follow the given steps
      </h1>
      <div className="instructions mb-6 mt-5 ">
        <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed gap-y-5">
          <li>Take a plain white paper.</li>
          <li>Write the text provided in the box below.</li>
          <li>Click a photo of your handwriting.</li>
          <li>Correctly align the photo and upload it.</li>
        </ol>
      </div>
      <div className="overflow-hidden instruction-box bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-lg leading-relaxed font-semibold">
          "Jack quickly enjoyed fixing the vibrant zebra's puzzle while listening to an old saxophone, making a unique quiz for the charming fox with an exotic mix of melodies. The zebra's puzzle was a masterpiece of intricacy, filled with vibrant colors and challenging patterns that sparked Jack's imagination. As the saxophone's mellow tones filled the room, Jack felt inspired to create a quiz unlike any other—one that tested both wit and creativity. The charming fox, captivated by Jack's efforts, eagerly anticipated the quiz, which promised to be a delightful combination of challenge and whimsy. Together, the two immersed themselves in a world of music, puzzles, and intellectual exploration, leaving behind a memorable tale of collaboration and innovation."
        </p>
      </div>
    </div>
  );
};

export default HowtoUse;
