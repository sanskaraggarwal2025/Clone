import React from 'react';

interface ModalProps {
 onClose: () => void;
 children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
   <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
    <button
     onClick={onClose}
     className="float-right text-gray-400 hover:text-white"
    >
     X
    </button>
    <div className="text-white mt-4">
     {children}
    </div>
   </div>
  </div>
 );
};

export default Modal;
