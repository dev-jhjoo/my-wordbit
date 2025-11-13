import React from 'react';
import type { LearningProgress } from '../types';

interface StatisticsProps {
  progress: LearningProgress;
  onReset: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ progress, onReset }) => {
  const completed = progress.words.filter(w => w.status === 'completed').length;
  const completionRate = ((completed / progress.totalWords) * 100).toFixed(1);

  return (
    <div className="statistics">
      <h2>🎉 학습 완료!</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{progress.totalWords}</div>
          <div className="stat-label">총 단어</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{progress.currentRound}</div>
          <div className="stat-label">완료 라운드</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">완성도</div>
        </div>
      </div>
      <button className="reset-button" onClick={onReset}>
        다시 시작하기
      </button>
    </div>
  );
};
