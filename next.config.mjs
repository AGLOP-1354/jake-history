const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jake-history.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
