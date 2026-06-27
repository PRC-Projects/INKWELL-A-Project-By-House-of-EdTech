import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog"],
  },
  // Allow Server Actions and other dev resources from the preview URL.
  // Without this, Next.js 16 blocks Server Action POSTs as cross-origin.
  allowedDevOrigins: [
    "*.preview.emergentagent.com",
    "*.preview.emergentcf.cloud",
    "47410d40-b546-40d7-9d5a-b51e45d74e42.preview.emergentagent.com",
    "47410d40-b546-40d7-9d5a-b51e45d74e42.cluster-2.preview.emergentcf.cloud",
    "crdt-workspace.cluster-2.preview.emergentcf.cloud",
  ],
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
