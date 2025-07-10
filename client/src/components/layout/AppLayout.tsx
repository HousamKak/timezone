import { Outlet } from 'react-router-dom';
import Header from './Header';

interface AppLayoutProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const AppLayout = ({ isDarkMode, onThemeToggle }: AppLayoutProps) => {
  return (
    <div className={`min-h-screen surface-ground ${isDarkMode ? 'dark' : ''}`} style={{ margin: 0, padding: 0 }}>
      <Header onThemeToggle={onThemeToggle} isDarkMode={isDarkMode} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
