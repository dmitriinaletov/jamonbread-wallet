import { WalletInfo } from "./WalletInfo";
import { NftGallery } from "./NftGallery";
import { TransactionsList } from "./TransactionsList";
import { useWalletData } from "../hooks/useWalletData";
import { Popup } from "./Popup";
import { useState } from "react";

const JamonbreadWallet: React.FC = () => {
  const { balance, nfts, transactions } = useWalletData();
  const [selectedNft, setSelectedNft] = useState(null);

  return (
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-6">Wallet Info</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <WalletInfo balance={balance} />
      </div>
      <NftGallery nfts={nfts} onNftClick={setSelectedNft} />
      <TransactionsList transactions={transactions} />
      {selectedNft && (
        <Popup nft={selectedNft} onClose={() => setSelectedNft(null)} />
      )}
    </div>
  );
};

export default JamonbreadWallet;
