interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-800 border border-slate-700/50 rounded-xl shadow-lg px-5 py-4 text-white text-sm max-w-sm"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-slate-400 hover:text-white transition-colors ml-2"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
