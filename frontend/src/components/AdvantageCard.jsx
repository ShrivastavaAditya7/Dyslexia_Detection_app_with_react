import React from 'react';
import styled from 'styled-components';
import 'remixicon/fonts/remixicon.css';

const Card = (props) => {

  const isDark =props.isDarkMode
  return (
    <StyledWrapper isDarkMode={isDark}>
      <div className="card mt-16">
        <div className="flex flex-col justify-center items-center">
          <i className={`${props.icon} text-5xl font-bold dark:text-white`}></i>
          <h5 className="mt-2 text-lg font-bold dark:text-white tracking-wider">{props.title}</h5>
        </div>
        <div className="card__content">
          <p className="card__title">{props.title}</p>
          <p className="card__description">
          {props.description}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    height: 200px;
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#1f2937' : '#f2f2f2')}; /* Gray-900 for dark mode */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 5px ${({ isDarkMode }) => (isDarkMode ? '#4b5563' : '#374151')}; /* Gray-700 for both modes */
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px ${({ isDarkMode }) => (isDarkMode ? '#374151' : 'rgba(0, 0, 0, 0.2)')}; /* Subtle shadow for light mode */
  }

  .card svg {
    width: 48px;
    fill: ${({ isDarkMode }) => (isDarkMode ? '#d1d5db' : '#333')}; /* Light gray for dark mode */
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover svg {
    scale: 0;
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#1f2937' : '#f2f2f2')};
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 24px;
    color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#1f2937')}; /* Almost white for dark mode */
    font-weight: 700;
  }

  .card__description {
    margin: 10px 0 0;
    font-size: 14px;
    color: ${({ isDarkMode }) => (isDarkMode ? '#d1d5db' : '#777')}; /* Light gray for dark mode */
    line-height: 1.4;
  }
`;

export default Card;
