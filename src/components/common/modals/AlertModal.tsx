import useModalHandlers from '@hooks/useModalHandlers';
import Modal from './Modal';

// Types
import type { ReactNode } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ReactNode;
}

export function AlertModal({ isOpen, onClose, message }: AlertModalProps) {
  useModalHandlers(isOpen, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-2 text-lg font-semibold">Alert</h2>
      <p className="text-lg text-gray-800">{message}</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          OK
        </button>
      </div>
    </Modal>
  );
}
