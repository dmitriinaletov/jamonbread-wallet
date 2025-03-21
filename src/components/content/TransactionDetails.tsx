import { useEffect, useRef } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export const TransactionDetails: React.FC = () => {
  const { transactions, isLoading, loadMoreTransactions, hasMore } =
    useTransactions();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTransactionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTransactions();
        }
      },
      { threshold: 0 }
    );

    if (lastTransactionRef.current) {
      observer.current.observe(lastTransactionRef.current);
    }

    return () => observer.current?.disconnect();
  }, [isLoading, hasMore, loadMoreTransactions]);

  return (
    <div className="text-left">
      <div className="w-[calc(100%-2rem)] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      </div>

      {transactions.length === 0 && !isLoading && (
        <p className="w-[calc(100%-2rem)] mx-auto text-sm text-gray-600">
          No transactions available
        </p>
      )}

      {transactions.map((transaction, index) => {
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
            ref={index === transactions.length - 1 ? lastTransactionRef : null}
            className="mb-6 p-4 border rounded-lg shadow-md bg-white mx-auto w-[calc(100%-2rem)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="text-sm text-gray-600">
                <strong>Amount:</strong> {formattedAda} ₳
              </div>
              <div className="text-sm text-gray-600 text-left">
                <strong>Fee:</strong> {fee} ₳
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
      })}

      {isLoading && (
        <p className="w-[calc(100%-2rem)] mx-auto text-sm text-gray-600">
          Loading transactions...
        </p>
      )}
    </div>
  );
};
