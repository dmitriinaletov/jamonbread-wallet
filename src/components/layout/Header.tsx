import logo from "../../assets/wallet-svgrepo-com.svg";
import balanceIcon from "../../assets/coins-currency-svgrepo-com.svg";
import { useState } from "react";
import { useBalance } from "../../hooks/useBalance";
import { Popup } from "../popup/Popup";
import { TransactionDetails } from "../content/TransactionDetails";

export const Header: React.FC = () => {
  const balance = useBalance();

  const [showTransactionPopup, setShowTransactionPopup] =
    useState<boolean>(false);

  const handleBalanceClick = () => {
    setShowTransactionPopup(true);
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
        <img src={logo} alt="Wallet Logo" className="mr-2 w-6 h-6" />
        Wallet Info
      </h1>
      <div
        className="relative group cursor-pointer"
        onClick={handleBalanceClick}
      >
        <div className="text-2xl font-semibold text-gray-800 flex items-center">
          <img src={balanceIcon} alt="Balance Icon" className="mr-2 w-6 h-6" />
          {balance !== null ? `${balance} ₳` : "Loading..."}
        </div>
        <div className="absolute hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md top-full mt-1 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
          Click to see details
        </div>
      </div>
      {showTransactionPopup && (
        <Popup onClose={() => setShowTransactionPopup(false)}>
          <TransactionDetails />
        </Popup>
      )}
    </header>
  );
};
