import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const EduGateLogo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const sizes = {
    sm: { width: 120, height: 32, fontSize: 20 },
    md: { width: 160, height: 40, fontSize: 28 },
    lg: { width: 200, height: 50, fontSize: 36 }
  };

  const { width, height, fontSize } = sizes[size];
  const textColor = variant === 'dark' ? '#1a1a1a' : '#ffffff';

  return (
    <svg width={width} height={height} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
      {/* Icon - Graduation cap with gate */}
      <g transform="translate(5, 10)">
        {/* Gate structure */}
        <rect x="0" y="15" width="3" height="20" fill="#009E60" rx="1"/>
        <rect x="27" y="15" width="3" height="20" fill="#009E60" rx="1"/>
        <rect x="0" y="15" width="30" height="3" fill="#009E60" rx="1"/>
        
        {/* Graduation cap */}
        <path d="M 15 5 L 5 12 L 15 19 L 25 12 Z" fill="#3A75C4"/>
        <path d="M 15 19 L 15 25" stroke="#FCD116" strokeWidth="2"/>
        <circle cx="15" cy="26" r="2" fill="#FCD116"/>
      </g>
      
      {/* Text */}
      <text x="45" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontSize={fontSize} fontWeight="700" fill={textColor}>
        Edu<tspan fill="#009E60">Gate</tspan>
      </text>
    </svg>
  );
};

export default EduGateLogo;
