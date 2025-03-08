import { NftGallery } from "./NftGallery";
// import { TransactionsList } from "./TransactionsList";
import { useWalletData } from "../hooks/useWalletData";
import { Popup } from "./Popup";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Transaction } from "../types/types";

const JamonbreadWallet: React.FC = () => {
  const { balance, nfts, transactions } = useWalletData();

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
      <Header balance={balance} onBalanceClick={handleBalanceClick} />
      <NftGallery nfts={nfts} onNftClick={handleNftClick} />
      {/* <TransactionsList transactions={transactions} /> */}
      {(selectedNftIndex !== null || selectedTransaction) && (
        <Popup
          nft={selectedNftIndex !== null ? nfts[selectedNftIndex] : undefined}
          transaction={selectedTransaction || undefined}
          onClose={() => {
            setSelectedNftIndex(null);
            setSelectedTransaction(null);
          }}
          onNavigate={selectedNftIndex !== null ? handleNavigate : undefined}
          currentIndex={selectedNftIndex ?? undefined}
          totalNfts={nfts.length}
        />
      )}
    </div>
  );
};

export default JamonbreadWallet;
