import { WalletInfoProps } from "../types/types";

const WalletInfo: React.FC<WalletInfoProps> = ({ balance }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg">
        Balance: {balance ? `${balance} ADA` : "Loading..."}
      </h2>
    </div>
  );
};

export { WalletInfo };
