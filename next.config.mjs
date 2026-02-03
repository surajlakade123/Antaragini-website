/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "judge0.com",
            },
            {
                protocol: "https",
                hostname: "loremflickr.com", // Reliable image source
            },
            {
                protocol: "https",
                hostname: "fastly.picsum.photos",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
        ],
    },
};

export default nextConfig;
