import auth from "@/api/routes/auth";
import helloWorld from "@/api/routes/hello-world";
import transaction from "@/api/routes/transaction";
import { Elysia } from "elysia";

export default new Elysia().use(helloWorld).use(auth).use(transaction);
