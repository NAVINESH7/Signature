export interface CreateOrderInput {
  customer_name: string;
  email: string;
  phone: string;

  address_line_1: string;
  address_line_2?: string;

  city: string;
  state: string;
  pincode: string;
  country: string;
}