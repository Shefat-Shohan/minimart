import React from "react";
import Hero from "./sections/Hero";
import Service from "./sections/service";
import TopProducts from "./sections/TopProducts";
import Footer from "./sections/Footer";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="">
      <Hero />
      <Service />
      <TopProducts />
    </div>
  );
}
