"use client";
import { ProductDetails } from "@/data/types";
import ProductCard from "./productCard";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

export default function Products() {
  const { data: products, loading } = useProducts(
    "https://admin.refabry.com/api/all/product/get"
  );
  return (
    <div className="">
      {!loading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2  md:gap-10 gap-10">
          {products?.map((product: ProductDetails) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        "loading.."
      )}
    </div>
  );
}
