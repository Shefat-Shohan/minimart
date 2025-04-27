import { ProductApiTypes, ProductDetails } from "@/data/types";
import { useEffect, useState } from "react";

export const useProducts = (url: string) => {
  const [data, setData] = useState<ProductDetails[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("API connection failed.");
        }
        const result: ProductApiTypes = await res.json();
        setData(result.data.data);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Api connection failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { data, loading,error };
};
