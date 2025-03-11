import { useNfts } from "../../hooks/useNfts";
import { useState, useEffect } from "react";
import { NftDetails } from "./NftDetails";
import { Popup } from "../popup/Popup";

export const NftGallery: React.FC = () => {
  const nfts = useNfts();
  const [selectedNftIndex, setSelectedNftIndex] = useState<number | null>(null);

  const handleNftClick = (index: number) => {
    setSelectedNftIndex(index);
  };

  const handleNavigate = (direction: "left" | "right") => {
    if (selectedNftIndex === null) return;

    const nextIndex =
      direction === "left" ? selectedNftIndex - 1 : selectedNftIndex + 1;

    if (nextIndex >= 0 && nextIndex < nfts.length) {
      setSelectedNftIndex(nextIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handleNavigate("left");
    } else if (event.key === "ArrowRight") {
      handleNavigate("right");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNftIndex]);

  return (
    <div className="mt-8 w-full">
      <h2 className="text-xl font-semibold text-left mb-4">
        Your NFT Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 sm:px-0 overflow-hidden">
        {nfts.length === 0 ? (
          <p className="text-left">Loading NFTs...</p>
        ) : (
          nfts.map((nft, index) => (
            <div
              key={index} // Schválně tady mám index, protože NFT token je podle mě citlivá informace, ale ID v metadatech NFT nemají. Nevím, jestli tady mohu použít token.
              className="p-3 border rounded-lg shadow-md bg-white w-full cursor-pointer"
              onClick={() => handleNftClick(index)}
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

      {selectedNftIndex !== null && (
        <Popup onClose={() => setSelectedNftIndex(null)}>
          <NftDetails
            nft={nfts[selectedNftIndex]}
            currentIndex={selectedNftIndex}
            totalItems={nfts.length}
            onNavigate={handleNavigate}
          />
        </Popup>
      )}
    </div>
  );
};
