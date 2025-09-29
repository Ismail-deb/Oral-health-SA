import React, { useState, useCallback, useEffect } from 'react';
import type { Page } from './types';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import LearnPage from './pages/LearnPage';
import DirectoryPage from './pages/DirectoryPage';
import SymptomTrackerPage from './pages/SymptomTrackerPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { generateImage } from './services/geminiService';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ensureAvatarsExist = async () => {
      try {
        const aiAvatarPromise = (async () => {
          if (!localStorage.getItem('aiAssistantAvatar')) {
            console.log("No AI assistant avatar found, generating one...");
            const aiAvatarPrompt = "A modern, friendly AI assistant avatar for a dental health app. Stylized tooth logo subtly integrated with a sound wave or a gentle smile curve. Use a clean, minimalist design with a soft color palette of teal (#14b8a6), light blue (#38bdf8), and white. Smooth gradients. Flat 2D vector style. Centered in a circle.";
            const avatarUrl = await generateImage(aiAvatarPrompt);
            localStorage.setItem('aiAssistantAvatar', avatarUrl);
          }
        })();

        await Promise.all([aiAvatarPromise]);

      } catch (error) {
        console.error("Failed to ensure avatars exist:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    ensureAvatarsExist();
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'chat':
        return <ChatPage onNavigate={navigate} />;
      case 'learn':
        return <LearnPage onNavigate={navigate} />;
      case 'directory':
        return <DirectoryPage onNavigate={navigate} />;
      case 'tracker':
        return <SymptomTrackerPage onNavigate={navigate} />;
      case 'community':
        return <CommunityPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <LogoIcon className="h-16 w-16 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">{renderPage()}</div>
    </ThemeProvider>
  );
};

export default App;