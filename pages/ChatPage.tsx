import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Page, ChatMessage } from '../types';
import { createChat, sendMessage } from '../services/geminiService';
import { Header } from '../components/Header';
import { UserIcon } from '../components/icons';
import type { Chat } from '@google/genai';

// For Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface ChatPageProps {
  onNavigate: (page: Page) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your AI Oral Health Assistant for South Africa. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiAvatar, setAiAvatar] = useState('');
  const chatRef = useRef<Chat | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createChat();

    const loadAvatars = () => {
      const storedAiAvatar = localStorage.getItem('aiAssistantAvatar');
      if (storedAiAvatar) {
        setAiAvatar(storedAiAvatar);
      }
    };

    loadAvatars();
  }, []);
  
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-ZA';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prevInput => (prevInput ? prevInput + ' ' : '') + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn('Speech Recognition not supported by this browser.');
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleNewConversation = useCallback(() => {
    chatRef.current = createChat();
    setMessages([{
        role: 'model',
        text: "Hello! I'm your AI Oral Health Assistant for South Africa. How can I help you today?",
    }]);
  }, []);

  const handleSend = useCallback(async (prompt?: string) => {
    const userMessage = prompt || input;
    if (!userMessage.trim() || !chatRef.current) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(chatRef.current, userMessage);
      setMessages((prev) => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages((prev) => [...prev, { role: 'model', text: `Sorry, something went wrong. ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const handleMicClick = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);


  const quickPrompts = [
    "How often should I brush my teeth?",
    "What are the symptoms of gum disease?",
    "How can I prevent cavities?",
  ];

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <Header onNavigate={onNavigate} currentPage="chat" />

      <main className="flex-grow flex flex-col items-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl flex-grow flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
                <button onClick={handleNewConversation} className="bg-primary/20 dark:bg-primary/30 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40">
                New Conversation
                </button>
            </div>

          <div className="flex-grow space-y-6 overflow-y-auto p-4 md:p-6 bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200/50 dark:border-gray-800/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${aiAvatar}")` }}></div>
                )}
                <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{msg.role === 'model' ? 'AI Assistant' : 'You'}</span>
                  <div className={`${msg.role === 'model' ? 'bg-background-light dark:bg-gray-800 rounded-tl-none' : 'bg-primary/20 dark:bg-primary/30 rounded-tr-none'} p-3 rounded-lg max-w-lg`}>
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
                 {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                    <UserIcon className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 items-start animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${aiAvatar}")` }}></div>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Assistant</span>
                    <div className="bg-background-light dark:bg-gray-800 p-3 rounded-lg rounded-tl-none">
                        <div className="flex items-end gap-1.5 h-5 text-primary">
                           <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="pt-4 shrink-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                {quickPrompts.map(prompt => (
                     <button key={prompt} onClick={() => handleSend(prompt)} className="text-left text-sm p-3 bg-white dark:bg-background-dark/50 border border-gray-200/50 dark:border-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50" disabled={isLoading}>
                        {prompt}
                     </button>
                ))}
            </div>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
                className="w-full h-14 md:h-16 p-4 pr-28 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                placeholder="Type your question or use the microphone..."
              />
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleMicClick}
                    disabled={!recognitionRef.current || isLoading}
                    className={`p-2 rounded-full transition-colors ${
                    isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-label={isListening ? 'Stop recording' : 'Start recording'}
                >
                    <span className="material-symbols-outlined">mic</span>
                </button>
                <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="p-2 rounded-full text-white bg-primary hover:bg-primary/90 disabled:bg-primary/50">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;