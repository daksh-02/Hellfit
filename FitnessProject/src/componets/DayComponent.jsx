import React, { useState } from 'react';

function DayComponent({ day, children, isCurrentDay }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full border border-gray-300 rounded-lg mb-3 ${isCurrentDay ? 'bg-green-400' : 'bg-gray-800'} text-white`}>
      <div className="flex justify-between items-center p-4">
        <span>{day}</span>
        <button
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          onClick={toggleOpen}
        >
          ↓
        </button>
      </div>
      {isOpen && <div className="p-4 animate-slide-down text-white">{children}</div>}
    </div>
  );
}

export default DayComponent;
