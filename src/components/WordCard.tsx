import React, { useState, useEffect, useRef } from 'react';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  onSwipe: (direction: 'left' | 'right') => void;
}

const extractPartOfSpeech = (text: string): string | undefined => {
  const match = text.match(/\(([^)]+)\)/);
  return match ? match[1] : undefined;
};

export const WordCard: React.FC<WordCardProps> = ({ word, onSwipe }) => {
  const [showMeaning, setShowMeaning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const partOfSpeech = word.partOfSpeech ?? extractPartOfSpeech(word.korean);
  const hasMovedRef = useRef(false);
  const ignoreMouseRef = useRef(false);

  useEffect(() => {
    setShowMeaning(false);
    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
    hasMovedRef.current = false;
  }, [word.id]);

  const handleStart = (clientX: number, isTouch: boolean = false) => {
    if (!isTouch && ignoreMouseRef.current) return;
    setIsDragging(true);
    setStartX(clientX);
    hasMovedRef.current = false;
  };

  const handleMove = (clientX: number, isTouch: boolean = false) => {
    if (!isTouch && ignoreMouseRef.current) return;
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
    if (Math.abs(offset) > 10) {
      hasMovedRef.current = true;
    }
  };

  const handleEnd = (isTouch: boolean = false) => {
    if (!isTouch && ignoreMouseRef.current) return;

    if (isTouch) {
      ignoreMouseRef.current = true;
      setTimeout(() => {
        ignoreMouseRef.current = false;
      }, 600);
    }

    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? 'right' : 'left');
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    // 합성된 클릭 이벤트 방지 (터치 후 발생하는 클릭)
    if (e.detail === 0) return;

    if (isDragging || hasMovedRef.current) {
      return;
    }
    setShowMeaning(prev => !prev);
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
        onMouseDown={(e) => handleStart(e.clientX, false)}
        onMouseMove={(e) => handleMove(e.clientX, false)}
        onMouseUp={() => handleEnd(false)}
        onMouseLeave={() => handleEnd(false)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, true)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, true)}
        onTouchEnd={() => handleEnd(true)}
        onClick={handleClick}
      >
        <div className="word-content">
          <h1 className="word-english">{word.english}</h1>
          {partOfSpeech && <p className="word-pos">{partOfSpeech}</p>}
          {showMeaning && (
            <p className="word-korean">{word.korean}</p>
          )}
          {!showMeaning && (
            <p className="word-hint">탭탭하여 뜻 보기</p>
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
    </div>
  );
};
