import { TransactionsListProps } from "../types/types";

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
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
              <p>
                <strong>Transaction Hash:</strong> {tx.tx_hash}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
