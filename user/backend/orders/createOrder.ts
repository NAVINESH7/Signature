import { supabaseAdmin } from "@/lib/supabase-admin";

import type { CartItem } from "@/user/backend/cart/types";

interface CreateOrderInput {
  userId?: string | null;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  pincode: string;
  country: string;

  cart: CartItem[];
}

export async function createOrder(
  data: CreateOrderInput
) {

    console.log("================================");
    console.log("ORDER DATA RECEIVED");
    console.log(data);
    console.log("USER ID:", data.userId);
    console.log("================================");

  const totalAmount = data.cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );



  const { data: order, error } =
    await supabaseAdmin
      .from("orders")
      .insert({
        user_id: data.userId,

        customer_name:
          `${data.firstName} ${data.lastName}`,

        email: data.email,

        phone: data.phone,

        address_line_1:
          data.addressLine1,

        address_line_2:
          data.addressLine2,

        city: data.city,

        state: data.state,

        pincode: data.pincode,

        country: data.country,

        total_amount: totalAmount,

        status: "pending",
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  const orderItems = data.cart.map(
    (item) => ({
      order_id: order.id,

      product_id: item.product_id,

      product_name: item.name,

      product_image: item.image,

      price: item.price,

      quantity: item.quantity,
    })
  );

  const result =
    await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

  console.log(
    "ORDER ITEMS RESULT",
    result
  );

  const itemsError =
    result.error;

  if (itemsError) {
    throw itemsError;
  }

  return order;
}