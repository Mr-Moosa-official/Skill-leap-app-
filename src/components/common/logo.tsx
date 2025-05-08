import { APP_NAME } from '@/lib/constants';
import { GraduationCap } from 'lucide-react'; // Example icon

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo = ({ size = 'md', className, showText = true }: LogoProps) => {
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl';

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <GraduationCap className={`${iconSize} text-primary`} />
      {showText && <span className={`${textSize} font-bold text-primary`}>{APP_NAME}</span>}
    </div>
  );
};
