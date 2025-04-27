import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-[url('/ecomerceBanner.jpg')] bg-cover bg-center min-h-[60dvh] flex items-center">
      <div className="text-2xl container">
        <div className="w-full">
          <p className="text-lg">Sale! Up to 50% off!</p>
          <h1 className="md:text-5xl max-w-lg font-bold lg:py-4 pt-1.5 pb-4 text-3xl leading-[30px]">
            Summer Sale Collections
          </h1>
          <Button>
            <Link href={"/shop"}>Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
