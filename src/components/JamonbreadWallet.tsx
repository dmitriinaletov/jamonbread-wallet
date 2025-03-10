import React, { useState, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useNfts } from "../hooks/useNfts";
import { Popup } from "./popup/Popup";
import { Header } from "./Header";
import { NftDetails } from "./popup/NftDetails";
import { TransactionDetails } from "./popup/TransactionDetails";
import { NavigationButtons } from "./popup/NavigationButtons";
import { NftGallery } from "./NftGallery";
import { Footer } from "./Footer";

const JamonbreadWallet: React.FC = () => {
  const transactions = useTransactions();
  const nfts = useNfts();

  const [selectedNftIndex, setSelectedNftIndex] = useState<number | null>(null);
  const [showTransactionPopup, setShowTransactionPopup] =
    useState<boolean>(false);

  const handleNftClick = (index: number) => {
    setSelectedNftIndex(index);
  };

  const handleBalanceClick = () => {
    setShowTransactionPopup(true);
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
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <Header onBalanceClick={handleBalanceClick} />
      <NftGallery nfts={nfts} onNftClick={handleNftClick} />
      {selectedNftIndex !== null && (
        <Popup onClose={() => setSelectedNftIndex(null)}>
          <NftDetails nft={nfts[selectedNftIndex]} />
          <NavigationButtons
            currentIndex={selectedNftIndex}
            totalItems={nfts.length}
            onNavigate={handleNavigate}
          />
        </Popup>
      )}
      {showTransactionPopup && (
        <Popup onClose={() => setShowTransactionPopup(false)}>
          <TransactionDetails transactions={transactions} />
        </Popup>
      )}
      <Footer />
    </div>
  );
};

export default JamonbreadWallet;
