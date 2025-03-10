import { NavigationButtonsProps } from "../../types/types";

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalItems,
  onNavigate,
}) => {
  return (
    <>
      <button
        className={`absolute left-0.5 top-1/2 transform -translate-y-1/2 text-6xl cursor-pointer transition-opacity ${
          currentIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onNavigate("left")}
        disabled={currentIndex === 0}
      >
        &#8249;
      </button>
      <button
        className={`absolute right-0.5 top-1/2 transform -translate-y-1/2 text-6xl cursor-pointer transition-opacity ${
          currentIndex === totalItems - 1
            ? "opacity-50 cursor-not-allowed"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onNavigate("right")}
        disabled={currentIndex === totalItems - 1}
      >
        &#8250;
      </button>
    </>
  );
};
