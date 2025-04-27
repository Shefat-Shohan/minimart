"use client";
import {
  PaginatedProductData,
  ProductApiTypes,
  ProductDetails,
} from "@/data/types";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";

type Props = {
  productId: number;
};

export default function RecommendedProduct({ productId }: Props) {
  const [recommendedProduct, setRecommendedProduct] = useState<
    ProductDetails[] | null
  >(null);
  const { data, loading } = useProducts(
    "https://admin.refabry.com/api/all/product/get"
  );

  useEffect(() => {
    const getProduct = () => {
      if (Array.isArray(data)) {
        const result = data.filter((product) => product.id != productId);
        setRecommendedProduct(result);
      }
    };
    getProduct();
  }, [productId, data]);

  if (!recommendedProduct) return;
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2  md:gap-10 gap-10">
        {recommendedProduct.map((product: ProductDetails) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
