/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
    domains: ["example.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
