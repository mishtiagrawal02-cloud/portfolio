import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Prevent Turbopack from walking up the filesystem and hitting macOS protected folders
  // This forces Turbopack to use the project directory as the workspace root.
  ...( { turbopack: { root: path.resolve(__dirname) } } as any ),

  /* config options here */
};

export default nextConfig;
