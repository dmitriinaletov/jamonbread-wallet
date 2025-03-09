import { Transaction } from "../../types/types";

export const TransactionDetails: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-600">No transactions available</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.tx_hash} className="mb-4">
            <p className="text-sm text-gray-600">
              <strong>Transaction Hash:</strong> {transaction.tx_hash}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Block Height:</strong>{" "}
              {transaction.details?.block_height ?? "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Block Time:</strong>{" "}
              {transaction.details?.block_time
                ? new Date(
                    transaction.details.block_time * 1000
                  ).toLocaleString()
                : "N/A"}
            </p>
            <hr className="my-4" />
          </div>
        ))
      )}
    </div>
  );
};
