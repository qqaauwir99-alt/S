import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0B1714]/95 border border-[#C5A96A]/50 text-[#F3EFE5] shadow-2xl backdrop-blur-md transition-all duration-300 animate-fadeIn text-sm sm:text-base font-medium pointer-events-auto select-none"
    >
      <div className="w-6 h-6 rounded-full bg-[#10221E] border border-[#C5A96A]/40 flex items-center justify-center shrink-0">
        <Lock className="w-3.5 h-3.5 text-[#C5A96A]" />
      </div>
      <span className="font-heritage tracking-wide">{message}</span>
    </div>
  );
};
