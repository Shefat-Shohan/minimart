"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, ChevronLeft, ChevronRight, Dot, Slash } from "lucide-react";
import RecommendedProduct from "./RecommendedProduct";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCartContext } from "@/context/AddCartContext";
import { toast } from "sonner";
import Title from "./Title";

type Props = {
  id: number;
};

export default function ProductDetails({ id }: Props) {
  const [description, setDescription] = useState(false);
  const { setCart, cart } = useCartContext();

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  const { data, loading } = useProducts(
    "https://admin.refabry.com/api/all/product/get"
  );
  console.log(cart);

  const product = data?.find((product) => product.id == id);
  if (!product) return;

  const handleAddToCard = (productId: number) => {
    const item = data?.find((product) => product.id === productId);
    if (!item) return toast.error("Product not found");

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === productId
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, quantity: (cartItem.quantity as number) + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    toast.success("Product added to cart");
  };

  // place order
  const handleBuyNow = async () => {
    try {
      const response = await fetch(
        "https://admin.refabry.com/api/public/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_ids: "1,2",
            s_product_qty: "2,1",
            c_phone: "01734252112",
            c_name: "test",
            courier: "steadfast",
            address: "mirpur 12 ramzanessamarket",
            advance: null,
            cod_amount: "1250",
            discount_amount: null,
            delivery_charge: "80",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Api error");
      }

      const data = await response.json();
      console.log("Order placed", data);
      toast("Your order is placed.");
    } catch (error) {
      console.log(error);
      toast("Couldn't place the order.");
    }
  };

  return (
    <section>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="pb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="capitalize">
                    {product.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Image
            src={`https://admin.refabry.com/storage/product/${product.image}`}
            alt="image"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-gray-500 capitalize pb-1.5">
            {product.category.name}
          </p>
          <h1 className="lg:text-3xl text-xl font-bold pb-4 capitalize">
            {product.name}
          </h1>
          {/* price */}
          <div className="pb-4 flex items-center gap-2">
            <span
              className={`${
                product.discount_amount ? "line-through" : "text-xl font-bold"
              }`}
            >
              {product.price} TK
            </span>
            {product.discount_amount && (
              <p className="text-xl font-bold">
                {product.price - Number(product.discount_amount)} Tk
              </p>
            )}
          </div>
          {/* product description */}
          <div>
            <span className="font-bold text-gray-800">Description</span>
            <p className="py-1 leading-[22px] text-gray-600 text-sm">
              {description
                ? product.short_desc
                : product.short_desc.slice(0, 220)}{" "}
              <span
                className="text-[#7B4FDB] font-semibold cursor-pointer"
                onClick={() => setDescription((prev) => !prev)}
              >
                {description ? "show less" : "show more"}
              </span>
            </p>
            <p className="text-gray-500 font-semibold py-4 text-sm">
              Available stocks:{" "}
              <span className="text-gray-800">{product.stock}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-4">
            <Button
              onClick={() => handleAddToCard(product.id)}
              className="bg-[#7B4FDB] hover:bg-[#9b70f7] w-full"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="w-full bg-transparent border hover:text-white border-gray-500 text-black"
            >
              Buy Now
            </Button>
          </div>
          <p className="text-gray-500 font-semibold text-sm underline cursor-pointer pt-4">
            Delivery Terms & Condition
          </p>
          <div>
            <h2 className="text-xl font-bold py-3">
              Secure your payment gurantee.
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center gap-1 text-[16px]">
                    <Box className="size-4" /> Return
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-500 text-sm font-normal">
                <p className=" pb-3">
                  You have <strong>60 days</strong> to return the item(s) using
                  any of the following methods:{" "}
                </p>
                <p>
                  <span className="flex items-center gap-1">
                    <Dot className="size-6" /> Free store return
                  </span>
                </p>
                <p>
                  <span className="flex items-center gap-1">
                    <Dot className="size-6" /> Free return via USPS Dropoff
                    Service
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <Title title="Recommended Product" className="sm:text-left" />
        <RecommendedProduct productId={id} />
      </div>
    </section>
  );
}
