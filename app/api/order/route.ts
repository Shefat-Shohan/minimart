import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json("Method not allowed");
  }
  try {
    const {
      product_ids,
      s_product_qty,
      c_phone,
      c_name,
      courier,
      address,
      advance,
      cod_amount,
      discount_amount,
      delivery_charge,
    } = req.body;

    const required = [
      product_ids,
      s_product_qty,
      c_phone,
      c_name,
      courier,
      address,
      advance,
      cod_amount,
      discount_amount,
      delivery_charge,
    ];
    if (required.some((key) => key === undefined || key === null)) {
      return res.status(400).json({ error: "One or many fields are missing." });
    } else {
      const response = await fetch(
        "https://admin.refabry.com/api/public/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_ids: product_ids,
            s_product_qty: s_product_qty,
            c_phone: c_phone,
            c_name: c_name,
            courier: courier,
            address: address,
            advance: advance,
            cod_amount: cod_amount,
            discount_amount: discount_amount,
            delivery_charge: delivery_charge,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Api error");
      }
      const result = await response.json();
      console.log("Order Placed", result);
      return result;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error.");
  }
};
