/** @type {import('next').NextConfig} */
const nextConfig = {
reactCompiler: true,
turbopack: false,
ssr: true,
reactStrictMode: false,
output: 'export',
images: {
  unoptimized: true,
},
webpack: (config) => {
  config.resolve.fallback = { fs: false, path: false };
  return config;
},
};

export default nextConfig;
