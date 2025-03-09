import { Transaction } from "../../types/types";

export const TransactionDetails: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <p className="text-sm text-gray-600">
        <strong>Transaction Hash:</strong> {transaction.tx_hash}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Block Height:</strong> {transaction.details?.block_height}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Block Time:</strong>{" "}
        {new Date(transaction.details?.block_time * 1000).toLocaleString()}
      </p>
    </div>
  );
};
