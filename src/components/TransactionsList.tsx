import React from "react";
import { TransactionsListProps } from "../types/types";
import { NftMetadata, Transaction, Amount } from "../types/types";

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  nfts,
}) => {
  const renderTransactionDetails = (transaction: Transaction) => {
    if (!transaction.details || !transaction.details.output_amount) return null;

    const totalAmount = transaction.details.output_amount.reduce(
      (total: number, amount: Amount) => {
        if (amount.unit === "lovelace") {
          total += parseInt(amount.quantity, 10);
        }
        return total;
      },
      0
    );

    const nftsList = transaction.details.output_amount
      .filter((amount: Amount) => amount.unit !== "lovelace")
      .map((amount: Amount, index: number) => {
        const nft = nfts.find((nft: NftMetadata) => nft.symbol === amount.unit);
        if (!nft) return null;

        return (
          <div key={index} className="flex items-center mb-4">
            <img
              src={`https://ipfs.io/ipfs/${nft.image.replace("ipfs://", "")}`}
              alt={nft.name}
              className="w-16 h-16 object-cover mr-4"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{nft.name}</span>
              <span className="text-xs text-gray-500">
                Price: {amount.quantity} {amount.unit}
              </span>
            </div>
          </div>
        );
      });

    return (
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Transaction Hash:</strong> {transaction.tx_hash}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Block Height:</strong> {transaction.details.block_height}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Block Time:</strong>{" "}
          {new Date(transaction.details.block_time * 1000).toLocaleString()}
        </p>
        <div>{nftsList}</div>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Total Transaction Amount:</strong> {totalAmount / 1000000} ADA
        </p>
      </div>
    );
  };

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Recent Transactions
      </h2>
      <ul className="divide-y divide-gray-200">
        {transactions.length === 0 ? (
          <p className="text-center">Loading Transactions...</p>
        ) : (
          transactions.map((tx) => (
            <li
              key={tx.tx_hash}
              className="py-2 text-gray-700 text-center overflow-hidden text-ellipsis break-words"
            >
              {renderTransactionDetails(tx)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export { TransactionsList };
