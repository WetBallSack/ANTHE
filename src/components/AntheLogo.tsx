import React from 'react';

interface AntheLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function AntheLogo({ className = '', size = 45, color = 'currentColor' }: AntheLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 105 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left major slanted bar */}
      <path
        d="M15 80 L47 15 L60 15 L28 80 Z"
        fill={color}
      />
      
      {/* Right minor slanted bar */}
      <path
        d="M62 80 L78 45 L90 45 L74 80 Z"
        fill={color}
      />
      
      {/* Center structural triangle */}
      <path
        d="M34 80 L45 55 L56 80 Z"
        fill={color}
      />
    </svg>
  );
}
