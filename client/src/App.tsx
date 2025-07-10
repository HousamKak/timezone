import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import TradeHistory from './pages/TradeHistory';
import TradeRecommendation from './pages/TradeRecommendation';
import NewTradePM from './pages/NewTradePM';
import Performance from './pages/Performance';
import 'primeicons/primeicons.css';

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <AppLayout 
              isDarkMode={isDarkMode} 
              onThemeToggle={toggleTheme} 
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="new-trade-analyst" element={<TradeRecommendation />} />
          <Route path="new-trade-pm" element={<NewTradePM />} />
          <Route path="history" element={<TradeHistory />} />
          <Route path="performance" element={<Performance />} />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
