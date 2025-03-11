import axios from "axios";
import { useEffect, useState } from "react";
import { Transaction, TransactionDetails } from "../types/types";
import { API_URL, API_KEY, ADDRESS } from "../config";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = (pageNumber: number) => {
    setIsLoading(true);

    axios
      .get<Transaction[]>(`${API_URL}/addresses/${ADDRESS}/transactions`, {
        headers: { project_id: API_KEY },
        params: { count: 10, page: pageNumber, order: "desc" },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }

        const transactionDetailsPromises = response.data.map((tx) =>
          axios
            .get<TransactionDetails>(`${API_URL}/txs/${tx.tx_hash}`, {
              headers: { project_id: API_KEY },
            })
            .then((detailsResponse) => ({
              ...tx,
              details: detailsResponse.data,
            }))
            .catch((error) => {
              console.error("Error fetching transaction details:", error);
              return { ...tx, details: undefined };
            })
        );

        Promise.all(transactionDetailsPromises)
          .then((transactionsWithDetails) => {
            setTransactions((prev) => [...prev, ...transactionsWithDetails]);
          })
          .catch((error) => {
            console.error("Error processing transactions:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const loadMoreTransactions = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { transactions, isLoading, loadMoreTransactions, hasMore };
};
