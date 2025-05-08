'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AudioIconButtonProps {
  onClick?: () => void;
  className?: string;
  tooltipText?: string;
}

export const AudioIconButton = ({ onClick, className, tooltipText = "Toggle audio assistance" }: AudioIconButtonProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const { toast } = useToast();

  const handleClick = () => {
    setIsMuted(!isMuted);
    if (onClick) {
      onClick();
    } else {
      // Placeholder functionality
      toast({
        title: "Audio Assistance",
        description: `Audio is now ${!isMuted ? 'ON' : 'OFF'}. (Feature in development)`,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={tooltipText}
      className={className}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6 text-primary" />}
    </Button>
  );
};
