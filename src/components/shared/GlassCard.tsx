import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default GlassCard;
