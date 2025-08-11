/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  
  // Adicione esta seção para permitir o acesso de Server Actions
  // a partir do seu domínio de desenvolvimento remoto.
  experimental: {
    serverActions: {
      allowedOrigins: [
        'glowing-trout-grrv5p4xpwwhg4x-3000.app.github.dev',
        'localhost:3000'
      ],
    },
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Isso permite requisições de qualquer origem, ideal para desenvolvimento
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;