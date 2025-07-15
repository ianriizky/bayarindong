import { modelX, prisma } from "@/api/model";
import { orderStoreRequestBody, OrderType } from "@/typebox/order";
import { Static } from "elysia";
import { Queue } from "quirrel/next-app";

export const orderQueue = Queue<
  Static<typeof orderStoreRequestBody> & {
    type: OrderType;
    user_id: prisma.User["id"];
  }
>("api/queue/order", async (job, meta) => {
  try {
    console.log("coeg", job);
    const data = await modelX.order.create({
      data: {
        // id: job.order_id,
        type: job.type,
        amount: job.amount,
        status: "success",
        timestamp: job.timestamp,
        user: { connect: { id: job.user_id } },
      },
    });

    console.log("coeg", data);
  } catch (error) {
    console.error(error);
  }
});

export const POST = orderQueue;
