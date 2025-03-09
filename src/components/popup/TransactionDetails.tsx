import { Transaction } from "../../types/types";

export const TransactionDetails: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <div className="text-left">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-600">No transactions available</p>
      ) : (
        transactions.map((transaction) => {
          const date = transaction.details?.block_time
            ? new Date(transaction.details.block_time * 1000).toLocaleString()
            : "N/A";

          const totalAda = transaction.details?.output_amount?.find(
            (item) => item.unit === "lovelace"
          )?.quantity;
          const formattedAda = totalAda
            ? (parseInt(totalAda) / 1000000).toFixed(6)
            : "N/A";

          const fee = transaction.details?.fees
            ? (parseInt(transaction.details.fees) / 1000000).toFixed(6)
            : "N/A";

          return (
            <div
              key={transaction.tx_hash}
              className="mb-6 p-4 border rounded-lg shadow-md bg-white"
            >
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> {formattedAda} ₳
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fee:</strong> {fee} ₳
              </p>
              <p className="text-sm text-gray-600 truncate">
                <strong>Tx Hash:</strong>{" "}
                <a
                  href={`https://cardanoscan.io/transaction/${transaction.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {transaction.tx_hash.slice(0, 10)}...
                </a>
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};
