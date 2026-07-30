/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        // 프론트엔드와 동일 origin으로 API를 프록시해 로그인 시 발급되는
        // httpOnly 쿠키(accessToken/refreshToken)가 프론트 도메인에 저장되도록 함
        source: "/api/:path*",
        destination: `${process.env.BACKEND_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
