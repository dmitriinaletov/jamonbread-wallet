import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction, TransactionDetails } from "../types/types";
import { API_URL, API_KEY, ADDRESS } from "../config";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get<Transaction[]>(`${API_URL}/addresses/${ADDRESS}/transactions`, {
        headers: { project_id: API_KEY },
      })
      .then((res) => {
        const transactionDetailsPromises = res.data.map((tx) =>
          axios
            .get(`${API_URL}/txs/${tx.tx_hash}`, {
              headers: { project_id: API_KEY },
            })
            .then((response) => ({
              ...tx,
              details: response.data as TransactionDetails,
            }))
            .catch((error) => {
              console.error("Error fetching transaction details:", error);
              return { ...tx, details: undefined };
            })
        );

        Promise.all(transactionDetailsPromises)
          .then((transactionsWithDetails) => {
            const sortedTransactions = transactionsWithDetails
              .filter((tx) => tx.details !== undefined)
              .sort((a, b) => b.details!.block_time - a.details!.block_time);

            setTransactions(sortedTransactions.slice(0, 10));
          })
          .catch((error) => {
            console.error("Error processing transaction details:", error);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      });
  }, []);

  return { transactions, isLoading };
};
