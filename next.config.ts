import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;