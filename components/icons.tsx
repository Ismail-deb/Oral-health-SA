
import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_6_330)">
      <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
    </g>
    <defs>
      <clipPath id="clip0_6_330">
        <rect fill="white" height="48" width="48"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const ChatIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.15 15.85c-.32.32-.84.32-1.16 0l-3.32-3.32a.996.996 0 0 1 0-1.41l3.32-3.32c.32-.32.84-.32 1.16 0l.58.58c.32.32.32.84 0 1.16L14.83 12l2.9 2.9c.32.32.32.84 0 1.16l-.58.59zm-8.3 0c-.32.32-.84.32-1.16 0l-.58-.59a.824.824 0 0 1 0-1.16l2.9-2.9-2.9-2.9a.824.824 0 0 1 0-1.16l.58-.58c.32-.32.84-.32 1.16 0l3.32 3.32a.996.996 0 0 1 0 1.41l-3.32 3.32z"></path>
    </svg>
);

export const ProfileIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.17 14.42c-1.42 1.42-3.28 2.2-5.17 2.2s-3.75-.78-5.17-2.2c-1.42-1.42-2.2-3.28-2.2-5.17s.78-3.75 2.2-5.17C8.25 4.83 10.11 4 12 4s3.75.83 5.17 2.25c1.42 1.42 2.2 3.28 2.2 5.17s-.78 3.75-2.2 5.17zM12 18c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
    </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
    </svg>
);