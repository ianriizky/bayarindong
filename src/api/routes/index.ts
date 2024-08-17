import helloWorld from "@/api/routes/hello-world";
import { Elysia } from "elysia";

export default new Elysia()
  .onError(({ set }) => {
    set.headers["content-type"] = "application/json;charset=utf-8";
  })
  .use(helloWorld);
