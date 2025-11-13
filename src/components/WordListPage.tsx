import React, { useState } from 'react';
import type { LearningProgress } from '../types';
import { words } from '../data/words';

interface WordListPageProps {
  progress: LearningProgress;
  onClose: () => void;
  onUpdateProgress: (progress: LearningProgress) => void;
}

type FilterType = 'all' | 'known' | 'unknown' | 'completed';

export const WordListPage: React.FC<WordListPageProps> = ({
  progress,
  onClose,
  onUpdateProgress,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 학습한 단어들
  const studiedWords = words.filter((w) => {
    const wordProgress = progress.words.find(wp => wp.id === w.id);
    return wordProgress && wordProgress.status !== 'not-studied';
  });

  // 필터링
  const getFilteredWords = () => {
    let filtered = studiedWords;

    if (filter === 'known') {
      filtered = words.filter((w) => {
        const wp = progress.words.find(p => p.id === w.id);
        return wp?.status === 'known';
      });
    } else if (filter === 'unknown') {
      filtered = words.filter((w) => {
        const wp = progress.words.find(p => p.id === w.id);
        return wp?.status === 'unknown';
      });
    } else if (filter === 'completed') {
      filtered = words.filter((w) => {
        const wp = progress.words.find(p => p.id === w.id);
        return wp?.status === 'completed';
      });
    }

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        (w) =>
          w.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.korean.includes(searchTerm)
      );
    }

    return filtered.sort((a, b) => a.id - b.id);
  };

  const filteredWords = getFilteredWords();

  // 단어 상태 토글
  const toggleWordStatus = (wordId: number) => {
    const newProgress = { ...progress };
    const wordIndex = newProgress.words.findIndex(w => w.id === wordId);
    
    if (wordIndex === -1) return;

    const currentStatus = newProgress.words[wordIndex].status;
    
    if (currentStatus === 'known') {
      newProgress.words[wordIndex] = {
        ...newProgress.words[wordIndex],
        status: 'unknown',
        lastStudied: Date.now(),
      };
    } else if (currentStatus === 'unknown') {
      newProgress.words[wordIndex] = {
        ...newProgress.words[wordIndex],
        status: 'known',
        lastStudied: Date.now(),
      };
    }

    onUpdateProgress(newProgress);
  };

  // 단어 상태 확인
  const getWordStatus = (wordId: number) => {
    const wordProgress = progress.words.find(w => w.id === wordId);
    return wordProgress?.status || 'not-studied';
  };

  const knownCount = progress.words.filter(w => w.status === 'known').length;
  const unknownCount = progress.words.filter(w => w.status === 'unknown').length;
  const completedCount = progress.words.filter(w => w.status === 'completed').length;

  return (
    <div className="word-list-overlay">
      <div className="word-list-page">
        <div className="word-list-header">
          <h2>📝 학습 단어 목록</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 검색 */}
        <div className="search-box">
          <input
            type="text"
            placeholder="단어 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 필터 버튼 */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체 ({studiedWords.length})
          </button>
          <button
            className={`filter-btn known ${filter === 'known' ? 'active' : ''}`}
            onClick={() => setFilter('known')}
          >
            아는 단어 ({knownCount})
          </button>
          <button
            className={`filter-btn unknown ${
              filter === 'unknown' ? 'active' : ''
            }`}
            onClick={() => setFilter('unknown')}
          >
            모르는 단어 ({unknownCount})
          </button>
          <button
            className={`filter-btn completed ${
              filter === 'completed' ? 'active' : ''
            }`}
            onClick={() => setFilter('completed')}
          >
            완료 ({completedCount})
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="info-message">
          💡 단어를 클릭하면 아는 단어 ↔ 모르는 단어로 변경할 수 있습니다
        </div>

        {/* 단어 리스트 */}
        <div className="word-list-container">
          {filteredWords.length === 0 ? (
            <div className="empty-message">
              {searchTerm
                ? '검색 결과가 없습니다'
                : filter === 'all'
                ? '아직 학습한 단어가 없습니다'
                : '해당하는 단어가 없습니다'}
            </div>
          ) : (
            <div className="word-list">
              {filteredWords.map((word) => {
                const status = getWordStatus(word.id);
                const isCompleted = status === 'completed';

                return (
                  <div
                    key={word.id}
                    className={`word-item ${status}`}
                    onClick={() => !isCompleted && toggleWordStatus(word.id)}
                    style={{ cursor: isCompleted ? 'default' : 'pointer' }}
                  >
                    <div className="word-item-content">
                      <div className="word-item-english">{word.english}</div>
                      <div className="word-item-korean">{word.korean}</div>
                    </div>
                    <div className="word-item-status">
                      {status === 'completed' && (
                        <span className="status-badge completed">✅ 완료</span>
                      )}
                      {status === 'known' && (
                        <span className="status-badge known">😊 알아요</span>
                      )}
                      {status === 'unknown' && (
                        <span className="status-badge unknown">📚 모름</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
