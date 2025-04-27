import Products from "../components/products";
import Title from "../components/Title";

export default function TopProducts() {
  return (
    <div className="container pb-10">
      <Title title="Trending Products" 
      />
      <Products />
    </div>
  );
}
