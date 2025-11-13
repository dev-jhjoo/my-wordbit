import React from 'react';
import type { LearningProgress } from '../types';

interface ProgressPageProps {
  progress: LearningProgress;
  onClose: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ progress, onClose }) => {
  const completed = progress.words.filter(w => w.status === 'completed').length;
  const known = progress.words.filter(w => w.status === 'known').length;
  const unknown = progress.words.filter(w => w.status === 'unknown').length;
  const notStudied = progress.words.filter(w => w.status === 'not-studied').length;
  
  const completionRate = ((completed / progress.totalWords) * 100).toFixed(1);
  const studiedCount = known + unknown + completed;

  return (
    <div className="progress-page-overlay">
      <div className="progress-page">
        <div className="progress-page-header">
          <h2>📊 학습 진행 상황</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="progress-summary">
          <div className="summary-card primary">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <div className="summary-value">{completionRate}%</div>
              <div className="summary-label">전체 완성도</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <div className="summary-value">{completed}</div>
              <div className="summary-label">완료한 단어</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">📝</div>
            <div className="summary-content">
              <div className="summary-value">{notStudied}</div>
              <div className="summary-label">학습 전 단어</div>
            </div>
          </div>
        </div>

        <div className="progress-details">
          <div className="detail-section">
            <h3>🔄 현재 라운드</h3>
            <div className="detail-card">
              <div className="detail-row">
                <span>라운드</span>
                <strong>{progress.currentRound}</strong>
              </div>
              <div className="detail-row">
                <span>아는 단어</span>
                <strong className="text-green">{known}</strong>
              </div>
              <div className="detail-row">
                <span>모르는 단어</span>
                <strong className="text-red">{unknown}</strong>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>📈 전체 통계</h3>
            <div className="detail-card">
              <div className="detail-row">
                <span>전체 단어 수</span>
                <strong>{progress.totalWords}</strong>
              </div>
              <div className="detail-row">
                <span>학습한 단어</span>
                <strong className="text-blue">{studiedCount}</strong>
              </div>
              <div className="detail-row">
                <span>학습 전 단어</span>
                <strong className="text-orange">{notStudied}</strong>
              </div>
              <div className="detail-row">
                <span>완료한 단어</span>
                <strong className="text-green">{completed}</strong>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>💪 학습 진행률</h3>
            <div className="progress-bar-large">
              <div 
                className="progress-fill-large" 
                style={{ width: `${completionRate}%` }}
              >
                <span className="progress-text">{completionRate}%</span>
              </div>
            </div>
            <p className="progress-message">
              {completed === progress.totalWords 
                ? '🎉 모든 단어를 완료했습니다!' 
                : `${notStudied}개의 단어가 남았습니다. 화이팅!`}
            </p>
          </div>
        </div>

        <button className="continue-button" onClick={onClose}>
          학습 계속하기
        </button>
      </div>
    </div>
  );
};
