import { useState, useEffect } from 'react';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function LiveClock() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-end" aria-label="Current date and time">
      <span className="text-white font-mono text-sm font-semibold">
        {formatTime(now)}
      </span>
      <span className="text-slate-400 text-xs">
        {formatDate(now)}
      </span>
    </div>
  );
}

export default LiveClock;
