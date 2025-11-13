import type { LearningProgress } from '../types';
import { words } from '../data/words';

const STORAGE_KEY = 'wordbit_progress';
const CURRENT_VERSION = 2; // 데이터 구조 버전

// 초기 진행 상황 생성
export const createInitialProgress = (): LearningProgress => {
  return {
    currentRound: 1,
    words: words.map(word => ({
      id: word.id,
      status: 'not-studied' as const,
    })),
    totalWords: words.length,
    version: CURRENT_VERSION,
  };
};

// LocalStorage 저장/불러오기 (자동 저장용)
export const saveProgress = (progress: LearningProgress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const loadProgress = (): LearningProgress | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    const saved = JSON.parse(data) as LearningProgress;
    
    // 버전 체크 및 마이그레이션
    if (!saved.version || saved.version < CURRENT_VERSION) {
      // 구버전 데이터는 초기화
      return createInitialProgress();
    }

    // 새로운 단어가 추가되었는지 확인
    if (saved.words.length < words.length) {
      const existingIds = new Set(saved.words.map(w => w.id));
      const newWords = words
        .filter(w => !existingIds.has(w.id))
        .map(w => ({
          id: w.id,
          status: 'not-studied' as const,
        }));
      
      return {
        ...saved,
        words: [...saved.words, ...newWords],
        totalWords: words.length,
      };
    }

    return saved;
  } catch {
    return null;
  }
};

export const clearProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// 파일로 내보내기
export const exportProgressToFile = (progress: LearningProgress): void => {
  const dataStr = JSON.stringify(progress, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  
  // 파일명: wordbit_backup_YYYYMMDD_HHMMSS.json
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  link.download = `wordbit_backup_${timestamp}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 다크모드 저장/불러오기
const THEME_KEY = 'wordbit_theme';

export const saveTheme = (isDark: boolean): void => {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
};

export const loadTheme = (): boolean => {
  const data = localStorage.getItem(THEME_KEY);
  return data ? JSON.parse(data) : false;
};

// 파일에서 가져오기
export const importProgressFromFile = (): Promise<LearningProgress> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('파일이 선택되지 않았습니다'));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const progress = JSON.parse(content) as LearningProgress;
          
          // 데이터 유효성 검사
          if (!progress.currentRound || !Array.isArray(progress.words)) {
            throw new Error('잘못된 파일 형식입니다');
          }
          
          resolve(progress);
        } catch (error) {
          reject(new Error('파일을 읽을 수 없습니다: ' + (error as Error).message));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('파일 읽기 실패'));
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  });
};
