import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction, TransactionDetails } from "../types/types";
import { API_URL, API_KEY, ADDRESS } from "../config";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<Transaction[]>(
        `${API_URL}/addresses/${ADDRESS}/transactions`,
        {
          headers: { project_id: API_KEY },
          params: { count: 10, page: pageNumber, order: "desc" }, // Добавлен параметр order
        }
      );

      if (response.data.length === 0) {
        setHasMore(false);
        return;
      }

      const transactionDetailsPromises = response.data.map(async (tx) => {
        try {
          const detailsResponse = await axios.get(
            `${API_URL}/txs/${tx.tx_hash}`,
            {
              headers: { project_id: API_KEY },
            }
          );
          return { ...tx, details: detailsResponse.data as TransactionDetails };
        } catch (error) {
          console.error("Error fetching transaction details:", error);
          return { ...tx, details: undefined };
        }
      });

      const transactionsWithDetails = await Promise.all(
        transactionDetailsPromises
      );

      setTransactions((prev) => [...prev, ...transactionsWithDetails]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
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
