import { NextResponse } from "next/server";

import { createOrder } from "@/user/backend/orders/createOrder";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const order =
      await createOrder(body);

    return NextResponse.json(
      order
    );
  } catch (error: any) {
    console.error(
      "ORDER API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to create order",
        details: error,
      },
      {
        status: 500,
      }
    );
  }
}