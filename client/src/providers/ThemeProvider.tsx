import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    let themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = 'theme-link';
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }
    
    themeLink.href = isDarkMode 
      ? 'https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css'
      : 'https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css';
    
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
