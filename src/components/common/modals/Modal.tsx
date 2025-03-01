import { createPortal } from 'react-dom';

// Types
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-lg rounded-md border border-gray-300 bg-white p-6 shadow-xl">
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
}
