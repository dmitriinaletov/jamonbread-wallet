import { NftGallery } from "./NftGallery";
import { TransactionsList } from "./TransactionsList";
import { useWalletData } from "../hooks/useWalletData";
import { Popup } from "./Popup";
import { useState, useEffect } from "react";
import { Header } from "./Header";

const JamonbreadWallet: React.FC = () => {
  const { balance, nfts, transactions } = useWalletData();

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

  useEffect(() => {
    if (selectedNftIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNftIndex]);

  return (
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <Header balance={balance} />
      <NftGallery nfts={nfts} onNftClick={handleNftClick} />
      <TransactionsList transactions={transactions} />
      {selectedNftIndex !== null && (
        <Popup
          nft={nfts[selectedNftIndex]}
          onClose={() => setSelectedNftIndex(null)}
          onNavigate={handleNavigate}
          currentIndex={selectedNftIndex}
          totalNfts={nfts.length}
        />
      )}
    </div>
  );
};

export default JamonbreadWallet;
