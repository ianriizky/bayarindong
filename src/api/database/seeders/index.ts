import development from "@/api/database/seeders/development";
import production from "@/api/database/seeders/production";

(async function () {
  if (process.env.NODE_ENV === "development") {
    await development();
  } else {
    await production();
  }
})();
