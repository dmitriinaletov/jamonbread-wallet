export interface Amount {
  unit: string;
  quantity: string | bigint;
}

export interface Transaction {
  tx_hash: string;
  amount: readonly Amount[];
}

export interface Utxo {
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: readonly Amount[];
  block: string;
  data_hash: string;
  inline_datum: string;
  reference_script_hash: string | null;
}

export interface NftMetadata {
  name: string;
  image: string;
  description: string[];
}

export interface NftGalleryProps {
  nfts: NftMetadata[];
}

export interface TransactionsListProps {
  transactions: Transaction[];
}

export interface WalletInfoProps {
  balance: number | null;
}
