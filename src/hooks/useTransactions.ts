import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../types/types";
import { API_URL, API_KEY, ADDRESS } from "../config";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get<Transaction[]>(`${API_URL}/addresses/${ADDRESS}/transactions`, {
        headers: { project_id: API_KEY },
      })
      .then((res) => {
        const transactionDetailsPromises = res.data.map((tx, index) =>
          axios
            .get(`${API_URL}/txs/${tx.tx_hash}`, {
              headers: { project_id: API_KEY },
            })
            .then((response) => ({ index, details: response.data }))
            .catch((error) => {
              console.error("Error fetching transaction details:", error);
              return { index, details: null };
            })
        );

        Promise.all(transactionDetailsPromises)
          .then((responses) => {
            const transactionsWithDetails = responses
              .sort((a, b) => a.index - b.index)
              .map((response, index) => ({
                ...res.data[index],
                details: response.details,
              }));

            setTransactions(transactionsWithDetails.slice(0, 10));
          })
          .catch((error) => {
            console.error("Error processing transaction details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return transactions;
};
