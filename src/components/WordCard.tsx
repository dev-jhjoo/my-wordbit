import React, { useState } from 'react';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const WordCard: React.FC<WordCardProps> = ({ word, onSwipe }) => {
  const [showMeaning, setShowMeaning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? 'right' : 'left');
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const rotation = dragOffset * 0.1;
  const opacity = 1 - Math.abs(dragOffset) / 300;

  return (
    <div className="card-container">
      <div
        className="word-card"
        style={{
          transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
          opacity: opacity,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onClick={() => !isDragging && setShowMeaning(!showMeaning)}
      >
        <div className="word-content">
          <h1 className="word-english">{word.english}</h1>
          {showMeaning && (
            <p className="word-korean">{word.korean}</p>
          )}
          {!showMeaning && (
            <p className="word-hint">탭하여 뜻 보기</p>
          )}
        </div>
      </div>

      <div className="swipe-indicators">
        <div className={`indicator left ${dragOffset < -50 ? 'active' : ''}`}>
          ← 몰라요
        </div>
        <div className={`indicator right ${dragOffset > 50 ? 'active' : ''}`}>
          알아요 →
        </div>
      </div>

      {/* <div className="button-group">
        <button 
          className="swipe-button unknown"
          onClick={() => onSwipe('left')}
        >
          모름
        </button>
        <button 
          className="swipe-button known"
          onClick={() => onSwipe('right')}
        >
          알아요
        </button>
      </div> */}
    </div>
  );
};
