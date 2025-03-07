import { WalletInfoProps } from "../types/types";

const WalletInfo: React.FC<WalletInfoProps> = ({ balance }) => {
  return (
    <div className="text-center w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        Balance: {balance ? `${balance} ADA` : "Loading..."}
      </h2>
    </div>
  );
};

export { WalletInfo };
