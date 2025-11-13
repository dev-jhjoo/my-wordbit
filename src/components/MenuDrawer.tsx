import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onWordList: () => void;
  onProgress: () => void;
  onSettings: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onWordList,
  onProgress,
  onSettings,
  isDarkMode,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const handleMenuClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <>
      <div className="menu-overlay" onClick={onClose} />
      <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>메뉴</h3>
          <button className="menu-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="menu-nav">
          <button
            className="menu-item"
            onClick={() => handleMenuClick(onWordList)}
          >
            <span className="menu-text">단어 목록</span>
          </button>

          <button
            className="menu-item"
            onClick={() => handleMenuClick(onProgress)}
          >
            <span className="menu-text">진행 상황</span>
          </button>

          <button
            className="menu-item"
            onClick={() => handleMenuClick(onSettings)}
          >
            <span className="menu-text">설정</span>
          </button>

          <div className="menu-divider" />

          <button className="menu-item" onClick={onToggleTheme}>
            <span className="menu-text">
              {isDarkMode ? '라이트 모드' : '다크 모드'}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};
