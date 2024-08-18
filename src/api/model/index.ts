import * as hash from "@/lib/hash";
import { atob, btoa } from "@/utils/str";
import prisma from "@prisma/client";

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
        return model.user.findFirst({ where: { name: atob(token) } });
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

          return orders.reduce(
            (balance, order) => balance + order.amount.toNumber(),
            0
          );
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
    },
  },
});

export { model, modelX, prisma };
