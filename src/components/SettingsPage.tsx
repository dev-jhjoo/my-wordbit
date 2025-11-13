import React, { useState } from 'react';
import type { LearningProgress } from '../types';
import { exportProgressToFile, importProgressFromFile } from '../utils/storage';

interface SettingsPageProps {
  progress: LearningProgress;
  onClose: () => void;
  onImportProgress: (progress: LearningProgress) => void;
  onResetAll: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  progress,
  onClose,
  onImportProgress,
  onResetAll,
}) => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    try {
      exportProgressToFile(progress);
      setMessage({
        type: 'success',
        text: '✅ 백업 파일이 다운로드되었습니다!',
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ 내보내기 실패: ' + (error as Error).message,
      });
    }
  };

  const handleImport = async () => {
    try {
      const importedProgress = await importProgressFromFile();
      onImportProgress(importedProgress);
      setMessage({
        type: 'success',
        text: '✅ 백업 파일을 불러왔습니다!',
      });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ 가져오기 실패: ' + (error as Error).message,
      });
    }
  };

  const handleReset = () => {
    onResetAll();
    setShowResetConfirm(false);
    setMessage({
      type: 'success',
      text: '✅ 모든 데이터가 초기화되었습니다',
    });
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 2000);
  };

  const lastBackupDate = new Date().toLocaleString('ko-KR');

  return (
    <div className="settings-overlay">
      <div className="settings-page">
        <div className="settings-header">
          <h2>⚙️ 설정</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="settings-content">
          {/* 백업 섹션 */}
          <section className="settings-section">
            <h3>💾 데이터 백업</h3>
            <p className="section-description">
              학습 진행 상황을 파일로 저장하거나 불러올 수 있습니다
            </p>

            <div className="settings-actions">
              <button className="settings-button primary" onClick={handleExport}>
                <span className="button-icon">📥</span>
                <div className="button-content">
                  <div className="button-title">백업 파일 내보내기</div>
                  <div className="button-desc">
                    현재 진행 상황을 JSON 파일로 저장
                  </div>
                </div>
              </button>

              <button className="settings-button" onClick={handleImport}>
                <span className="button-icon">📤</span>
                <div className="button-content">
                  <div className="button-title">백업 파일 가져오기</div>
                  <div className="button-desc">
                    저장된 파일에서 진행 상황 복원
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* 현재 상태 */}
          <section className="settings-section">
            <h3>📊 현재 상태</h3>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">현재 라운드</span>
                <span className="status-value">{progress.currentRound}</span>
              </div>
              <div className="status-item">
                <span className="status-label">완료한 단어</span>
                <span className="status-value">
                  {progress.words.filter(w => w.status === 'completed').length}
                </span>
              </div>
              <div className="status-item">
                <span className="status-label">전체 단어</span>
                <span className="status-value">{progress.totalWords}</span>
              </div>
              <div className="status-item">
                <span className="status-label">마지막 저장</span>
                <span className="status-value small">{lastBackupDate}</span>
              </div>
            </div>
          </section>

          {/* 위험 구역 */}
          <section className="settings-section danger-zone">
            <h3>⚠️ 위험 구역</h3>
            <p className="section-description">
              모든 학습 데이터가 삭제됩니다. 신중하게 선택하세요.
            </p>

            {!showResetConfirm ? (
              <button
                className="settings-button danger"
                onClick={() => setShowResetConfirm(true)}
              >
                <span className="button-icon">🗑️</span>
                <div className="button-content">
                  <div className="button-title">모든 데이터 초기화</div>
                  <div className="button-desc">처음부터 다시 시작</div>
                </div>
              </button>
            ) : (
              <div className="confirm-box">
                <p className="confirm-message">
                  정말로 모든 데이터를 삭제하시겠습니까?
                </p>
                <div className="confirm-buttons">
                  <button
                    className="confirm-button cancel"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    취소
                  </button>
                  <button className="confirm-button confirm" onClick={handleReset}>
                    삭제
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
