import { RefObject, useEffect } from 'react';

export default function useModalHandlers(
  isOpen: boolean,
  onClose: () => void,
  focusRef?: RefObject<HTMLInputElement | null>
) {
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      // Close modal on escape
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);

      // Auto-focus input if provided
      focusRef?.current?.focus();

      // Clean up
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, focusRef]);
}
