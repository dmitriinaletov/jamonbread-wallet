import { WalletInfo } from "./WalletInfo";
import { NftGallery } from "./NftGallery";
import { TransactionsList } from "./TransactionsList";
import { useWalletData } from "../hooks/useWalletData";

const JamonbreadWallet: React.FC = () => {
  const { balance, nfts, transactions } = useWalletData();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Wallet Info</h1>
      <WalletInfo balance={balance} />
      <NftGallery nfts={nfts} />
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default JamonbreadWallet;
