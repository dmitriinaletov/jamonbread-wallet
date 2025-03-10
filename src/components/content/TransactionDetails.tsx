import { Transaction } from "../../types/types";

export const TransactionDetails: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <div className="text-left">
      <div className="w-[calc(100%-2rem)] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      </div>
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
              className="mb-6 p-4 border rounded-lg shadow-md bg-white mx-auto w-[calc(100%-2rem)]"
            >
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-sm text-gray-600">
                  <strong>Amount:</strong> {formattedAda} ₳
                </div>
                <div className="text-sm text-gray-600 text-left">
                  <strong>Fee:</strong> {fee} ₳
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-sm text-gray-600">
                  <strong>Date:</strong> {date}
                </div>
                <div className="text-sm text-gray-600 text-left">
                  <strong>
                    <a
                      href={`https://cardanoscan.io/transaction/${transaction.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      More details
                    </a>
                  </strong>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
