import { NftDetailsProps } from "../../types/types";
import { Button } from "../generic/Button";

export const NftDetails: React.FC<NftDetailsProps> = ({
  nft,
  currentIndex,
  totalItems,
  onNavigate,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => onNavigate("left")}
        disabled={currentIndex === 0}
        className="text-6xl -ml-4"
      >
        &#8249;
      </Button>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">{nft.name}</h2>
        {nft.image ? (
          <img
            src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={nft.name}
            className="w-full h-auto rounded-md mb-4"
          />
        ) : (
          <p className="text-gray-500">Image unavailable</p>
        )}
        <p className="text-left text-sm text-gray-600 mt-2">
          {nft.description || "No description available"}
        </p>
      </div>

      <Button
        onClick={() => onNavigate("right")}
        disabled={currentIndex === totalItems - 1}
        className="text-6xl -mr-4"
      >
        &#8250;
      </Button>
    </div>
  );
};
