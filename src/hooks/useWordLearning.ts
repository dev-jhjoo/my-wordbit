import { useState, useEffect, useRef, useCallback } from 'react';
import type { Word, LearningProgress, WordStatus } from '../types';
import { words } from '../data/words';
import { saveProgress, loadProgress, createInitialProgress } from '../utils/storage';

// 배열 셔플 함수
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useWordLearning = () => {
  const [progress, setProgress] = useState<LearningProgress>(createInitialProgress());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const isMountedRef = useRef(true);

  // 현재 라운드에 학습할 단어 가져오기
  const getCurrentRoundWords = useCallback((prog: LearningProgress): Word[] => {
    if (prog.currentRound === 1) {
      // 1라운드: 아직 학습하지 않은 단어들 (랜덤)
      const notStudiedIds = prog.words
        .filter(w => w.status === 'not-studied')
        .map(w => w.id);
      
      const notStudiedWords = words.filter(w => notStudiedIds.includes(w.id));
      return shuffleArray(notStudiedWords);
    } else {
      // 2라운드 이상: 모르는 단어들만 (랜덤)
      const unknownIds = prog.words
        .filter(w => w.status === 'unknown')
        .map(w => w.id);
      
      const unknownWords = words.filter(w => unknownIds.includes(w.id));
      return shuffleArray(unknownWords);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    isMountedRef.current = true;
    
    const saved = loadProgress();
    const initialProgress = saved || createInitialProgress();
    
    setProgress(initialProgress);
    
    // 완료 여부 확인
    const allCompleted = initialProgress.words.every(w => w.status === 'completed');
    if (allCompleted) {
      setIsCompleted(true);
    } else {
      const roundWords = getCurrentRoundWords(initialProgress);
      setCurrentWords(roundWords);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [getCurrentRoundWords]);

  // 진행 상황 저장
  useEffect(() => {
    if (isMountedRef.current) {
      saveProgress(progress);
    }
  }, [progress]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (!isMountedRef.current || !currentWords[currentWordIndex]) return;
    
    const currentWord = currentWords[currentWordIndex];
    const newStatus: WordStatus = direction === 'right' ? 'known' : 'unknown';
    
    setProgress(prev => {
      const newWords = prev.words.map(w => 
        w.id === currentWord.id 
          ? { ...w, status: newStatus, lastStudied: Date.now() }
          : w
      );

      return {
        ...prev,
        words: newWords,
      };
    });

    if (currentWordIndex < currentWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // 라운드 완료
      finishRound();
    }
  }, [currentWords, currentWordIndex]);

  const finishRound = useCallback(() => {
    if (!isMountedRef.current) return;

    setProgress(prev => {
      const unknownCount = prev.words.filter(w => w.status === 'unknown').length;
      
      if (unknownCount === 0) {
        // 모든 단어 완료
        const completedWords = prev.words.map(w => ({
          ...w,
          status: 'completed' as const,
        }));
        
        setIsCompleted(true);
        
        return {
          ...prev,
          words: completedWords,
        };
      } else {
        // 다음 라운드로
        const nextRoundWords = getCurrentRoundWords({
          ...prev,
          currentRound: prev.currentRound + 1,
        });
        
        setCurrentWords(nextRoundWords);
        setCurrentWordIndex(0);
        
        return {
          ...prev,
          currentRound: prev.currentRound + 1,
        };
      }
    });
  }, [getCurrentRoundWords]);

  const resetProgress = useCallback(() => {
    if (!isMountedRef.current) return;
    
    const newProgress = createInitialProgress();
    setProgress(newProgress);
    
    const roundWords = getCurrentRoundWords(newProgress);
    setCurrentWords(roundWords);
    setCurrentWordIndex(0);
    setIsCompleted(false);
  }, [getCurrentRoundWords]);

  const updateProgress = useCallback((newProgress: LearningProgress) => {
    if (!isMountedRef.current) return;
    
    setProgress(newProgress);
    
    const roundWords = getCurrentRoundWords(newProgress);
    setCurrentWords(roundWords);
    
    if (currentWordIndex >= roundWords.length) {
      setCurrentWordIndex(0);
    }
  }, [currentWordIndex, getCurrentRoundWords]);

  // 통계 계산
  const getStats = useCallback(() => {
    const notStudied = progress.words.filter(w => w.status === 'not-studied').length;
    const known = progress.words.filter(w => w.status === 'known').length;
    const unknown = progress.words.filter(w => w.status === 'unknown').length;
    const completed = progress.words.filter(w => w.status === 'completed').length;

    return { notStudied, known, unknown, completed };
  }, [progress.words]);

  return {
    currentWord: currentWords[currentWordIndex],
    progress,
    currentWordIndex,
    totalCurrentWords: currentWords.length,
    isCompleted,
    handleSwipe,
    resetProgress,
    updateProgress,
    getStats,
  };
};
