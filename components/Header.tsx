import React from 'react';
import type { Page } from '../types';
import { LogoIcon, UserIcon } from './icons';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = page === currentPage;
  return (
    <a
      onClick={() => onNavigate(page)}
      className={`text-sm font-medium transition-colors cursor-pointer ${
        isActive
          ? 'text-primary font-semibold'
          : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
      }`}
    >
      {children}
    </a>
  );
};

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-200/50 dark:border-gray-700/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 md:px-10 py-3 shrink-0">
      <div className="flex items-center gap-3 text-gray-900 dark:text-white cursor-pointer" onClick={() => onNavigate('home')}>
        <LogoIcon className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-bold">Oral Health SA</h2>
      </div>
      <nav className="hidden md:flex flex-1 justify-end items-center gap-6">
        <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>Home</NavLink>
        <NavLink page="learn" currentPage={currentPage} onNavigate={onNavigate}>Learn</NavLink>
        <NavLink page="directory" currentPage={currentPage} onNavigate={onNavigate}>Find a Dentist</NavLink>
        <NavLink page="tracker" currentPage={currentPage} onNavigate={onNavigate}>Symptom Tracker</NavLink>
        <NavLink page="community" currentPage={currentPage} onNavigate={onNavigate}>Community</NavLink>
        <NavLink page="chat" currentPage={currentPage} onNavigate={onNavigate}>AI Assistant</NavLink>
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button onClick={() => onNavigate('profile')} className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400" aria-label="My Profile">
            <UserIcon className="w-6 h-6" />
        </button>
      </nav>
      <button className="md:hidden text-gray-800 dark:text-gray-200">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
};