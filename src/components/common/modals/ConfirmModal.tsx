import useModalHandlers from '@hooks/useModalHandlers';
import Modal from './Modal';

// Types
import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: ReactNode;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message
}: ConfirmModalProps) {
  useModalHandlers(isOpen, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-2 text-lg font-semibold">Confirm</h2>
      <p className="text-sm text-gray-800">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
