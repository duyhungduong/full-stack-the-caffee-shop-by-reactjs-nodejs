import React, { useEffect, useState } from 'react';

const WelcomeBanner = ({ heading, paragraphs }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const typingSpeed = 100;
  const deletingSpeed = 50;

  useEffect(() => {
    const handleTyping = () => {
        const currentText = paragraphs[textIndex];
  
        if (isDeleting) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }
  
        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Dừng 1 giây trước khi xóa
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % paragraphs.length);
        }
      };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, paragraphs, textIndex]);

  return (
    <div className="flex items-center justify-center min-h-60 bg-coffee-background">
      <div className="text-center">
        {/* Heading chào mừng */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-pacifico font-medium text-coffee-dark mb-6">
          {heading}
        </h1>

        {/* Đoạn mô tả với hiệu ứng gõ chữ */}
        {/* <p className="text-2xl md:text-3xl lg:text-4xl font-greatVibes text-gray-700">{displayText}</p> */}
        <p
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-greatVibes text-gray-600 transform transition-transform duration-500 ease-in-out ${
            charIndex === 0 && !isDeleting ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          {displayText}
        </p>
      </div>
    </div>
  )
}

export default WelcomeBanner