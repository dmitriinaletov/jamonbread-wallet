export type Amount = {
  unit: string;
  quantity: string;
};

export type TransactionDetails = {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  slot: number;
  output_amount: Amount[];
  fees: string;
  deposit: string;
  size: number;
};

export type Transaction = {
  tx_hash: string;
  amount: readonly Amount[];
  details?: TransactionDetails;
};

export type Utxo = {
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: readonly Amount[];
  block: string;
  data_hash: string;
  inline_datum: string;
  reference_script_hash: string | null;
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

export type TransactionsListProps = {
  transactions: Transaction[];
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
