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
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-hidden relative">
        <button
          className="absolute top-2 right-2 text-4xl w-10 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer z-10"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};
