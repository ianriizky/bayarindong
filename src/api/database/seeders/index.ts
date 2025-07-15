import { model, modelX } from "@/api/model";
import { RoleName, roleNames } from "@/typebox/role";

(async function () {
  await Promise.all(
    roleNames.map((name) => model.role.create({ data: { name } }))
  );

  const user = await modelX.user.create({
    data: {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: {
        connect: { name: "admin" as RoleName },
      },
    },
  });

  if (process.env.NODE_ENV === "development") {
    await modelX.order.create({
      data: {
        type: "deposit",
        status: "success",
        amount: 100000,
        timestamp: new Date(),
        user: { connect: { id: user.id } },
      },
    });

    await modelX.notification.create({
      data: {
        title: "Test",
        message: "haha",
        is_read: true,
        user: { connect: { id: user.id } },
      },
    });
  }
})();
