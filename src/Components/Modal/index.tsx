// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  selectedProfile: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  selectedProfile,
}) => {
  if (!isOpen) return null;
  console.log(selectedProfile, "open mmm");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey opacity-[0.9]">
      <div className="bg-primary w-full max-w-md p-6 rounded-xl shadow-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
