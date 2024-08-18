import env from "./src/utils/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  env,
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];

    return config;
  },
};

export default nextConfig;
