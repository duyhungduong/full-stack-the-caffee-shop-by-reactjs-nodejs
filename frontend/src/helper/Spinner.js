// Spinner.js
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-t-4 h-16 w-16"
        style={{
          borderColor: '#8b4513', // Màu nâu cho phần viền
          borderTopColor: '#d2691e', // Màu sáng hơn cho phần đầu spinner
          animationDuration: '0.5s',
        }}
      ></div>
    </div>
  );
};

export default Spinner;
