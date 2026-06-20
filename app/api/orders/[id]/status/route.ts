import { NextResponse } from "next/server";

import { updateOrderStatus } from "@/user/backend/orders/updateOrderStatus";

export async function PATCH(
  request: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    const body =
      await request.json();

    const order =
      await updateOrderStatus(
        id,
        body.status
      );

    return NextResponse.json(
      order
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update order",
      },
      {
        status: 500,
      }
    );
  }
}