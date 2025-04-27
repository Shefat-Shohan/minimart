"use client";
import { ProductDetails } from "@/data/types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextShape {
  cart: ProductDetails[];
  setCart: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
}

const AddCartContext = createContext<CartContextShape | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(AddCartContext);
  if (!context) {
    throw new Error(
      "useCartContext must be used within AddCartContextProvider"
    );
  }
  return context;
};

export const AddCartContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const storedCart =
    typeof window !== "undefined" ? localStorage.getItem("cart") : null;
  const initialCart = storedCart ? JSON.parse(storedCart) : [];

  const [cart, setCart] = useState<ProductDetails[]>(initialCart);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <AddCartContext.Provider value={{ cart, setCart }}>
      {children}
    </AddCartContext.Provider>
  );
};
