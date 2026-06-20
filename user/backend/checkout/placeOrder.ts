import { createOrder } from "@/user/backend/orders/createOrder";

interface PlaceOrderParams {
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

  cart: any[];
}

export async function placeOrder(
  data: PlaceOrderParams
) {
  return await createOrder(data);
}