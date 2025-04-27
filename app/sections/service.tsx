import { Bus, Lock, Percent } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

export default function Service() {
  return (
    <div className="container py-16">
      <div className="flex lg:flex-row flex-col justify-between md:items-center lg:gap-0 gap-6">
        <ServiceCard
          title="Free Shipping on Orders Over 1000 TK"
          subtitle="For more than 100,000 parts"
          Icon={Bus}
        />
        <ServiceCard
          title="Up to 40% OFF on Selected Items"
          subtitle="Available for all Categories"
          Icon={Percent}
        />
        <ServiceCard
          title="100% Secure Payment"
          subtitle="We ensure secure payment!"
          Icon={Lock}
        />
      </div>
    </div>
  );
}
