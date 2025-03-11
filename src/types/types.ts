export type Amount = {
  unit: string;
  quantity: string;
};

export type TransactionDetails = {
  block_time: number;
  output_amount: Amount[];
  fees: string;
};

export type Transaction = {
  tx_hash: string;
  amount: Amount[];
  details?: TransactionDetails;
};

export type Utxo = {
  amount: Amount[];
};

export type NftMetadata = {
  name: string;
  image: string;
  description?: string;
  Description?: string;
  message?: string;
};

export type HeaderProps = {
  onBalanceClick: () => void;
};

export type NftDetailsProps = {
  nft: NftMetadata;
  currentIndex: number;
  totalItems: number;
  onNavigate: (direction: "left" | "right") => void;
};

export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};
