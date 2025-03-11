import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, API_KEY, ADDRESS } from "../config";

export const useBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<{ amount: { unit: string; quantity: string }[] }>(
        `${API_URL}/addresses/${ADDRESS}`,
        { headers: { project_id: API_KEY } }
      )
      .then((res) => {
        const lovelace =
          res.data.amount.find((a) => a.unit === "lovelace")?.quantity || "0";
        setBalance(Number(lovelace) / 1000000);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, []);

  return balance;
};
