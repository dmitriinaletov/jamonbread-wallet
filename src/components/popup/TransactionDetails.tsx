import { Transaction } from "../../types/types";

export const TransactionDetails: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const { details } = transaction;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <p className="text-sm text-gray-600">
        <strong>Transaction Hash:</strong> {transaction.tx_hash}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Block Height:</strong> {details?.block_height ?? "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Block Time:</strong>{" "}
        {details?.block_time
          ? new Date(details.block_time * 1000).toLocaleString()
          : "N/A"}
      </p>
    </div>
  );
};
