import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options",          value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security",value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.unsplash.com http://127.0.0.1:8000 http://localhost:8000",
      "connect-src 'self' http://127.0.0.1:8000 http://localhost:8000",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: "export",
    basePath: "/eco-ride",
    trailingSlash: true,
    env: { NEXT_PUBLIC_BASE_PATH: "/eco-ride" },
  }),
  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "localhost",  port: "8000", pathname: "/storage/**" },
    ],
  },
  // Headers désactivés en mode export statique (GitHub Pages — servis par GitHub CDN)
  ...(!isGitHubPages && {
    async headers() {
      return [{ source: "/:path*", headers: securityHeaders }];
    },
  }),
};

export default nextConfig;
