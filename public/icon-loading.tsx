import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  width?: number;
  height?: number;
}
export const LoadingSpinner = ({
  className,
  width = 24,
  height = 24,
}: LoadingSpinnerProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('animate-spin dark:text-[white]', className)}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
};
