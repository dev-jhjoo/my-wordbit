import { useState, useEffect } from 'react';
import { WordCard } from './components/WordCard';
import { ProgressBar } from './components/ProgressBar';
import { Statistics } from './components/Statistics';
import { ProgressPage } from './components/ProgressPage';
import { WordListPage } from './components/WordListPage';
import { SettingsPage } from './components/SettingsPage';
import { MenuDrawer } from './components/MenuDrawer';
import { useWordLearning } from './hooks/useWordLearning';
import { saveTheme, loadTheme } from './utils/storage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(loadTheme());
  const [showProgressPage, setShowProgressPage] = useState(false);
  const [showWordListPage, setShowWordListPage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {
    currentWord,
    progress,
    currentWordIndex,
    totalCurrentWords,
    isCompleted,
    handleSwipe,
    resetProgress,
    updateProgress,
  } = useWordLearning();

  useEffect(() => {
    saveTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1></h1>
        <button
          className="hamburger-button"
          onClick={() => setShowMenu(true)}
          aria-label="메뉴"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </header>

      <MenuDrawer
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onWordList={() => setShowWordListPage(true)}
        onProgress={() => setShowProgressPage(true)}
        onSettings={() => setShowSettingsPage(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="app-main">
        {!isCompleted ? (
          <>
            <ProgressBar
              current={currentWordIndex}
              total={totalCurrentWords}
              round={progress.currentRound}
            />

            {currentWord && (
              <WordCard
                word={currentWord}
                onSwipe={handleSwipe}
              />
            )}
          </>
        ) : (
          <Statistics
            progress={progress}
            onReset={resetProgress}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>좌우로 스와이프하거나 버튼을 눌러 학습하세요</p>
      </footer>

      {showProgressPage && (
        <ProgressPage
          progress={progress}
          onClose={() => setShowProgressPage(false)}
        />
      )}

      {showWordListPage && (
        <WordListPage
          progress={progress}
          onClose={() => setShowWordListPage(false)}
          onUpdateProgress={updateProgress}
        />
      )}

      {showSettingsPage && (
        <SettingsPage
          progress={progress}
          onClose={() => setShowSettingsPage(false)}
          onImportProgress={updateProgress}
          onResetAll={resetProgress}
        />
      )}
    </div>
  );
}

export default App;
