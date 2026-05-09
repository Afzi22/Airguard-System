import type { ReactNode } from 'react';

interface MainLayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

export function MainLayout({ leftColumn, rightColumn }: MainLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4 p-4 flex-1 min-h-0">
      {/* Left column: GIS Map + Node Ticker */}
      <div className="flex flex-col gap-4 min-h-0">
        {leftColumn}
      </div>

      {/* Right column: LSTM Forecast + Policy Panel */}
      <div className="flex flex-col gap-4 min-h-0 overflow-y-auto">
        {rightColumn}
      </div>
    </div>
  );
}

export default MainLayout;
