import { NftGalleryProps } from "../types/types";

const NftGallery: React.FC<
  NftGalleryProps & { onNftClick: (nft: any) => void }
> = ({ nfts, onNftClick }) => {
  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-semibold text-center mb-4">
        NFT Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 sm:px-0 overflow-hidden">
        {nfts.length === 0 ? (
          <p className="text-center">Loading NFTs...</p>
        ) : (
          nfts.map((nft, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg shadow-md bg-white w-full cursor-pointer"
              onClick={() => {
                onNftClick(index);
              }}
            >
              <h3 className="text-md font-medium mb-2 text-center">
                {nft.name}
              </h3>
              {nft.image ? (
                <img
                  src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  alt={nft.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              ) : (
                <p>Image unavailable</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { NftGallery };
