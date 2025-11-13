export interface Word {
  id: number;
  english: string;
  korean: string;
}

export type WordStatus = 'not-studied' | 'known' | 'unknown' | 'completed';

export interface WordProgress {
  id: number;
  status: WordStatus;
  lastStudied?: number; // timestamp
}

export interface LearningProgress {
  currentRound: number;
  words: WordProgress[]; // 모든 단어의 상태
  totalWords: number;
  version: number; // 데이터 버전
}

export type SwipeDirection = 'left' | 'right' | null;
