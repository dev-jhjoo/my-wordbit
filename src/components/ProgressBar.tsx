import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  round: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, round }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>라운드 {round}</span>
        <span>{current + 1} / {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
