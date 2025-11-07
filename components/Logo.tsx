
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
          <stop offset="100%" style={{ stopColor: '#d946ef' }} />
        </linearGradient>
      </defs>
      <path d="M12 2L18 8V11C18 11.5304 17.7893 12.0391 17.4142 12.4142C17.0391 12.7893 16.5304 13 16 13H8C7.46957 13 6.96086 12.7893 6.58579 12.4142C6.21071 12.0391 6 11.5304 6 11V8L12 2Z" stroke="url(#logoGradient)"/>
      <path d="M12 13V22" stroke="url(#logoGradient)"/>
      <path d="M10 17H14" stroke="url(#logoGradient)"/>
      <path d="M6 8H2" stroke="url(#logoGradient)"/>
      <path d="M18 8H22" stroke="url(#logoGradient)"/>
      <circle cx="4" cy="11" r="1" stroke="url(#logoGradient)"/>
      <circle cx="20" cy="11" r="1" stroke="url(#logoGradient)"/>
      <circle cx="4" cy="15" r="1" stroke="url(#logoGradient)"/>
      <circle cx="20" cy="15" r="1" stroke="url(#logoGradient)"/>
      <path d="M4 11H8" stroke="url(#logoGradient)"/>
      <path d="M16 11H20" stroke="url(#logoGradient)"/>
      <path d="M4 15H8" stroke="url(#logoGradient)"/>
      <path d="M16 15H20" stroke="url(#logoGradient)"/>
      <circle cx="12" cy="13" r="4" stroke="url(#logoGradient)"/>
      <path d="M14.5 15.5L16.5 17.5" stroke="url(#logoGradient)"/>
    </svg>
  );
};

export default Logo;
