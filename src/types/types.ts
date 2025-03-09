export type Amount = {
  unit: string;
  quantity: string;
};

export type Transaction = {
  tx_hash: string;
  amount: readonly Amount[];
  details?: any;
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
  description: string;
  artist: string;
  country: string;
  blockchain: string;
  inspiration: string;
  symbol: string;
  mintingDate: string;
  validityPeriod: string;
};

export type NftGalleryProps = {
  nfts: NftMetadata[];
};

export type TransactionsListProps = {
  transactions: Transaction[];
  nfts: NftMetadata[];
};

export type HeaderProps = {
  onBalanceClick: () => void;
};
