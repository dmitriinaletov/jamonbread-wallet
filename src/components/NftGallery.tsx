import { NftGalleryProps } from "../types/types";

const NftGallery: React.FC<NftGalleryProps> = ({ nfts }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">NFTs</h2>
      <div className="grid grid-cols-3 gap-4">
        {nfts.length === 0 ? (
          <p>Loading NFTs...</p>
        ) : (
          nfts.map((nft, index) => (
            <div key={index} className="p-4 border rounded">
              <h3 className="text-lg font-medium">{nft.name}</h3>
              {nft.image && typeof nft.image === "string" ? (
                <img
                  src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  alt={nft.name}
                  className="w-full h-auto"
                />
              ) : (
                <p>Image unavailable</p>
              )}
              <p>
                {Array.isArray(nft.description) && nft.description.length > 0
                  ? nft.description.join(" ")
                  : "Description unavailable"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { NftGallery };
