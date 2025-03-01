import useModalHandlers from '@hooks/useModalHandlers';
import { useRef } from 'react';
import Modal from './Modal';

// Types
import type { ReactNode } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  message: ReactNode;
}

export function PromptModal({
  isOpen,
  onClose,
  onSubmit,
  message
}: PromptModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useModalHandlers(isOpen, onClose, inputRef);

  function handleSubmit() {
    if (inputRef.current) {
      onSubmit(inputRef.current.value);
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-2 text-lg font-semibold">Prompt</h2>
      <p className="text-sm text-gray-800">{message}</p>
      <input
        ref={inputRef}
        type="text"
        className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}
