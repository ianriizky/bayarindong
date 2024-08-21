import env from "./src/utils/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  env,

  /**
   * @see https://stackoverflow.com/a/78713900
   * @see https://mantine.dev/guides/next/#app-router-tree-shaking
   */
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default nextConfig;
