import { NftMetadata } from "../../types/types";

export const NftDetails: React.FC<{ nft: NftMetadata }> = ({ nft }) => {
  return (
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
      <p className="text-sm text-gray-600 mt-2">
        {nft.description || "No description available"}
      </p>
    </div>
  );
};
