import React, { useState, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useNfts } from "../hooks/useNfts";
import { Popup } from "./popup/Popup";
import { Header } from "./Header";
import { NftDetails } from "./popup/NftDetails";
import { TransactionDetails } from "./popup/TransactionDetails";
import { NavigationButtons } from "./popup/NavigationButtons";
import { NftGallery } from "./NftGallery";
import { TransactionsList } from "./TransactionsList";
import { Transaction } from "../types/types";

const JamonbreadWallet: React.FC = () => {
  const transactions = useTransactions();
  const nfts = useNfts();

  const [selectedNftIndex, setSelectedNftIndex] = useState<number | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleNftClick = (index: number) => {
    setSelectedNftIndex(index);
  };

  const handleBalanceClick = () => {
    if (transactions.length > 0) {
      setSelectedTransaction(transactions[0]);
    }
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
    document.body.style.overflow =
      selectedNftIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNftIndex]);

  return (
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <Header onBalanceClick={handleBalanceClick} />
      <TransactionsList transactions={transactions} />
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
      {selectedTransaction && (
        <Popup onClose={() => setSelectedTransaction(null)}>
          <TransactionDetails transaction={selectedTransaction} />
        </Popup>
      )}
    </div>
  );
};

export default JamonbreadWallet;
