import { Elysia } from "elysia";
import auth from "./auth";
import fcm from "./fcm";
import helloWorld from "./hello-world";
import notification from "./notification";
import transaction from "./transaction";

export default new Elysia()
  .use(helloWorld)
  .use(auth)
  .use(transaction)
  .use(notification)
  .use(fcm);
