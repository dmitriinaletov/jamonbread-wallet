import { TransactionsListProps } from "../types/types";

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Recent Transactions</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>Loading Transactions...</p>
        ) : (
          transactions.map((tx) => <li key={tx.tx_hash}>{tx.tx_hash}</li>)
        )}
      </ul>
    </div>
  );
};

export { TransactionsList };
