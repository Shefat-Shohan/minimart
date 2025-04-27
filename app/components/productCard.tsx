import { ProductDetails } from "@/data/types";
import Image from "next/image";
// https://admin.refabry.com/storage/product/7681_1734110373.webp
export default function ProductCard({ product }: { product: ProductDetails }) {
  return (
    <div className="">
      <Image
        src={`https://admin.refabry.com/storage/product/${product.image}`}
        alt="image"
        width={400}
        height={100}
        className="object-cover"
      />
      <div className="flex justify-between items-center mt-3">
        <h2 className="lg:text-xs md:text-sm font-semibold capitalize">
          {product.name}
        </h2>
        <span className="text-[16px] font-bold ">{product.price} tk</span>
      </div>
    </div>
  );
}
