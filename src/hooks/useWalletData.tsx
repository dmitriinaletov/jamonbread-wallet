import { useEffect, useState } from "react";
import axios from "axios";
import { NftMetadata, Transaction, Amount, Utxo } from "../types/types";

const API_URL = "https://cardano-mainnet.blockfrost.io/api/v0";
const API_KEY = "mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc";
const ADDRESS =
  "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23";

const useWalletData = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [nfts, setNfts] = useState<NftMetadata[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get<{ amount: Amount[] }>(`${API_URL}/addresses/${ADDRESS}`, {
        headers: { project_id: API_KEY },
      })
      .then((res) => {
        const lovelace =
          res.data.amount.find((a) => a.unit === "lovelace")?.quantity || "0";
        setBalance(Number(lovelace) / 1000000);
      });

    axios
      .get<Utxo[]>(`${API_URL}/addresses/${ADDRESS}/utxos`, {
        headers: { project_id: API_KEY },
      })
      .then((res) => {
        const nftTokens = res.data
          .flatMap((utxo) => utxo.amount)
          .filter((a) => a.unit !== "lovelace")
          .map((a) => a.unit);

        const getFormattedField = (
          metadata: any,
          field: string,
          isImage = false
        ) => {
          const value =
            metadata[field] ||
            metadata[field.charAt(0).toUpperCase() + field.slice(1)];

          if (Array.isArray(value)) {
            return isImage ? value.join("") : value.join(" ");
          }

          return value;
        };

        const fetchNftMetadata = async () => {
          const nftData: NftMetadata[] = [];

          const nftPromises = nftTokens.map((token, index) =>
            axios
              .get(`${API_URL}/assets/${token}`, {
                headers: { project_id: API_KEY },
              })
              .then((nftMetadataResponse) => {
                const metadata = nftMetadataResponse.data.onchain_metadata;
                if (metadata) {
                  return {
                    index,
                    metadata: {
                      name: getFormattedField(metadata, "name"),
                      image: getFormattedField(metadata, "image", true),
                      description: getFormattedField(metadata, "description"),
                      artist: getFormattedField(metadata, "artist"),
                      country: getFormattedField(metadata, "country"),
                      blockchain: getFormattedField(metadata, "blockchain"),
                      inspiration: getFormattedField(metadata, "inspiration"),
                      symbol: getFormattedField(metadata, "symbol"),
                      mintingDate: getFormattedField(metadata, "Minting Date"),
                      validityPeriod: getFormattedField(
                        metadata,
                        "Validity Period"
                      ),
                    },
                  };
                }
                return null;
              })
              .catch((error) => {
                console.error("Error fetching NFT metadata:", error);
                return null;
              })
          );

          const results = await Promise.all(nftPromises);

          results.forEach((result) => {
            if (result) {
              nftData[result.index] = result.metadata;
            }
          });

          setNfts(nftData);
        };

        fetchNftMetadata();
      });

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
            .then((response) => ({
              index,
              details: response.data,
            }))
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

            setTransactions(transactionsWithDetails.slice(0, 5));
          })
          .catch((error) => {
            console.error("Error processing transaction details:", error);
          });
      });
  }, []);

  return { balance, nfts, transactions };
};

export { useWalletData };
