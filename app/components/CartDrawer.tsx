import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartContext } from "@/context/AddCartContext";
import { X } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { setCart, cart } = useCartContext();

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 0;
      const discountAmount = Number(item.discount_amount) || 0;
      return total + (item.price - discountAmount) * quantity;
    }, 0);
  };
  const subtotal = getCartSubtotal();

  const removeItem = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>Cart</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-10">
              {cart.map((items) => (
                <div key={items.id} className="pb-6">
                  <div className="flex items-center justify-between border-t pt-6">
                    <div>
                      <h2 className="text-sm capitalize font-semibold text-gray-800 pb-[3px]">
                        {items.name}
                      </h2>
                      <p className="text-gray-500 text-xs">
                        {items.quantity} x{" "}
                        {items.discount_amount && (
                          <span>
                            {items.price - Number(items.discount_amount)}
                          </span>
                        )}
                      </p>
                    </div>
                    <X
                      onClick={() => removeItem(items.id)}
                      className="size-4 hover:text-red-400 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-[16px] font-semibold text-gray-700 capitalize">
                      subtotal
                    </p>
                    <span className="text-[16px] font-semibold text-gray-700">
                      {subtotal}
                    </span>
                  </div>
                  <div>
                    <Button className="w-full"> Checkout </Button>
                  </div>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
