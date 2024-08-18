import { model, modelX } from "@/api/model";

(async function () {
  await Promise.all(
    ["admin", "member"].map((name) => model.role.create({ data: { name } }))
  );

  await modelX.user.create({
    data: {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: {
        connect: { name: "admin" },
      },
    },
  });
})();
