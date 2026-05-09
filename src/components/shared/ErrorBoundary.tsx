import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function ErrorFallback({ error }: { error: Error | null }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 bg-slate-800/60 border border-rose-500/30 rounded-xl text-center"
    >
      <div className="text-rose-400 text-4xl mb-4">⚠</div>
      <h2 className="text-white text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-slate-400 text-sm">
        {error?.message ?? 'An unexpected error occurred. Please refresh the page.'}
      </p>
    </div>
  );
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
