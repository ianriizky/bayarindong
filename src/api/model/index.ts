import * as hash from "@/lib/hash";
import { atob, btoa } from "@/utils/str";
import prisma from "@prisma/client";
import crypto from "crypto";

const model = new prisma.PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

if (process.env.NODE_ENV === "development") {
  import("chalk").then((chalk) => {
    model.$on("query", (event) => {
      console.info(`${chalk.default.blue("prisma:query")} ${event.query}`);
      console.info(`${chalk.default.blue("prisma:params")}: ${event.params}`);
      console.info(
        `${chalk.default.blue("prisma:duration")}: ${event.duration}ms`
      );
      console.info(`${chalk.default.red("-----")}`);
    });
  });
}

const modelX = model.$extends({
  model: {
    user: {
      findFirstByToken(token: string) {
        return model.user.findFirst({
          where: { name: atob(token) },
          include: { role: true },
        });
      },
    },
  },
  query: {
    user: {
      async create({ model, operation, args, query }) {
        args.data.password = await hash.make(args.data.password);

        return query(args);
      },
    },
  },
  result: {
    user: {
      token: {
        needs: { name: true },
        compute(user) {
          return btoa(user.name);
        },
      },
      balance: {
        needs: { id: true },
        async compute(user) {
          const orders = await model.order.findMany({
            where: { user: { id: user.id } },
          });

          return orders.reduce((balance, order) => {
            if (order.type === "deposit") {
              return balance + order.amount.toNumber();
            } else if (order.type === "withdraw") {
              return balance - order.amount.toNumber();
            } else {
              return balance;
            }
          }, 0);
        },
      },
      gravatar_image: {
        needs: { email: true },
        compute(user) {
          return `https://www.gravatar.com/avatar/${crypto
            .createHash("md5")
            .update(user.email || "")
            .digest("hex")}`;
        },
      },
    },
    order: {
      status_code: {
        needs: { status: true },
        compute(order) {
          return (
            new Map([
              ["pending", 0],
              ["success", 1],
              ["failed", 2],
            ]).get(order.status) || 0
          );
        },
      },
      parsed_amount: {
        needs: { amount: true },
        compute(order) {
          return order.amount.toNumber();
        },
      },
      deposit_amount: {
        needs: { type: true, amount: true },
        compute(order) {
          return order.type === "deposit"
            ? Math.abs(order.amount.toNumber())
            : 0;
        },
      },
      withdraw_amount: {
        needs: { type: true, amount: true },
        compute(order) {
          return order.type === "withdraw"
            ? -Math.abs(order.amount.toNumber())
            : 0;
        },
      },
    },
  },
});

export { model, modelX, prisma };
