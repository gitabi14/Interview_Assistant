/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // During hackathon builds, skip build errors if needed
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
