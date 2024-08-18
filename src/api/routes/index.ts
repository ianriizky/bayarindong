import auth from "@/api/routes/auth";
import helloWorld from "@/api/routes/hello-world";
import { Elysia } from "elysia";

export default new Elysia().use(helloWorld).use(auth);
