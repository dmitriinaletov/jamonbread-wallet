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

export type NftGalleryProps = {
  nfts: NftMetadata[];
  onNftClick: (index: number) => void;
};

export type HeaderProps = {
  onBalanceClick: () => void;
};

export type NavigationDirection = "left" | "right";

export type NavigationButtonsProps = {
  currentIndex: number;
  totalItems: number;
  onNavigate: (direction: NavigationDirection) => void;
};
