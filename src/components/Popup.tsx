const Popup: React.FC<{
  nft: any;
  onClose: () => void;
  onNavigate: (direction: "left" | "right") => void;
  currentIndex: number;
  totalNfts: number;
}> = ({ nft, onClose, onNavigate, currentIndex, totalNfts }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-3xl w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <button
          className={`absolute left-1 top-1/2 transform -translate-y-1/2 text-6xl cursor-pointer transition-opacity ${
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
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-6xl cursor-pointer transition-opacity ${
            currentIndex === totalNfts - 1
              ? "opacity-50 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => onNavigate("right")}
          disabled={currentIndex === totalNfts - 1}
        >
          &#8250;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">{nft.name}</h2>

        {nft.image ? (
          <img
            src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={nft.name}
            className="w-full h-auto rounded-md mb-4"
          />
        ) : (
          <p className="text-center text-gray-500">Image unavailable</p>
        )}

        <p className="text-sm text-gray-600">
          <strong>Artist:</strong> {nft.artist || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Country:</strong> {nft.country || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Blockchain:</strong> {nft.blockchain || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Inspiration:</strong> {nft.inspiration || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Symbol:</strong> {nft.symbol || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Minting Date:</strong> {nft.mintingDate || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Validity Period:</strong> {nft.validityPeriod || "Unknown"}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {nft.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export { Popup };
