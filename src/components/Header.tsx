import { HeaderProps } from "../types/types";
import logo from "../assets/wallet-svgrepo-com.svg";
import balanceIcon from "../assets/coins-currency-svgrepo-com.svg";

const Header: React.FC<HeaderProps> = ({ balance }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
        <img src={logo} alt="Wallet Logo" className="mr-2 w-6 h-6" />
        Wallet Info
      </h1>
      <div className="relative group cursor-pointer">
        <div className="text-2xl font-semibold text-gray-800 flex items-center">
          <img src={balanceIcon} alt="Balance Icon" className="mr-2 w-6 h-6" />
          {balance ? `₳ ${balance}` : "Loading..."}
        </div>
        <div className="absolute hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md top-full mt-1 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
          Click to see details
        </div>
      </div>
    </div>
  );
};

export { Header };
