interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonLoader({ width = 'w-full', height = 'h-4', className = '' }: SkeletonLoaderProps) {
  return (
    <div
      className={`animate-pulse bg-slate-700/50 rounded-lg ${width} ${height} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
}

export default SkeletonLoader;
