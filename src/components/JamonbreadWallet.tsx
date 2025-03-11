import { useState } from "react";
import { Popup } from "./popup/Popup";
import { Header } from "./layout/Header";
import { TransactionDetails } from "./content/TransactionDetails";
import { NftGallery } from "./content/NftGallery";
import { Footer } from "./layout/Footer";

const JamonbreadWallet: React.FC = () => {
  const [showTransactionPopup, setShowTransactionPopup] =
    useState<boolean>(false);

  const handleBalanceClick = () => {
    setShowTransactionPopup(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <Header onBalanceClick={handleBalanceClick} />
      <NftGallery />
      {showTransactionPopup && (
        <Popup onClose={() => setShowTransactionPopup(false)}>
          <TransactionDetails />
        </Popup>
      )}
      <Footer />
    </div>
  );
};

export default JamonbreadWallet;
