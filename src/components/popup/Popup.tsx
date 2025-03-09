import { ReactNode, useEffect } from "react";

export const Popup: React.FC<{ children: ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-3xl w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
