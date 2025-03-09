export const NavigationButtons: React.FC<{
  currentIndex: number;
  totalNfts: number;
  onNavigate: (direction: "left" | "right") => void;
}> = ({ currentIndex, totalNfts, onNavigate }) => {
  return (
    <>
      <button
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer transition-opacity ${
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
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer transition-opacity ${
          currentIndex === totalNfts - 1
            ? "opacity-50 cursor-not-allowed"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onNavigate("right")}
        disabled={currentIndex === totalNfts - 1}
      >
        &#8250;
      </button>
    </>
  );
};
