import ProductDetails from "@/app/components/productDetails";
import { AddCartContextProvider } from "@/context/AddCartContext";

export default function page({ params: { id } }: { params: { id: number } }) {
  return (
    <div className="container py-20">
      <AddCartContextProvider>
        <ProductDetails id={id} />
      </AddCartContextProvider>
    </div>
  );
}
