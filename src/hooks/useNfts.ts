import { useEffect, useState } from "react";
import axios from "axios";
import { NftMetadata, Utxo } from "../types/types";
import { API_URL, API_KEY, ADDRESS } from "../config";

const getFormattedField = (
  metadata: NftMetadata,
  field: keyof NftMetadata
): string => {
  const value = metadata[field];
  const joinWith = field === "image" ? "" : " ";

  if (Array.isArray(value)) {
    return value.join(joinWith);
  }
  return value || "";
};

export const useNfts = () => {
  const [nfts, setNfts] = useState<NftMetadata[]>([]);

  useEffect(() => {
    axios
      .get<Utxo[]>(`${API_URL}/addresses/${ADDRESS}/utxos`, {
        headers: { project_id: API_KEY },
      })
      .then((res) => {
        const nftTokens = res.data
          .flatMap((utxo) => utxo.amount)
          .filter((a) => a.unit !== "lovelace")
          .map((a) => a.unit);

        const fetchNftMetadata = async () => {
          const nftData: NftMetadata[] = [];
          const nftPromises = nftTokens.map((token, index) =>
            axios
              .get<{ onchain_metadata: NftMetadata }>(
                `${API_URL}/assets/${token}`,
                {
                  headers: { project_id: API_KEY },
                }
              )
              .then((nftMetadataResponse) => {
                const metadata = nftMetadataResponse.data.onchain_metadata;
                if (metadata) {
                  return {
                    index,
                    metadata: {
                      name: getFormattedField(metadata, "name"),
                      image: getFormattedField(metadata, "image"),
                      description:
                        getFormattedField(metadata, "description") ||
                        getFormattedField(metadata, "Description") ||
                        getFormattedField(metadata, "message"),
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
            if (result) nftData[result.index] = result.metadata;
          });

          setNfts(nftData);
        };

        fetchNftMetadata();
      })
      .catch((error) => {
        console.error("Error fetching NFTs:", error);
      });
  }, []);
  return nfts;
};
