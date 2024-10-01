/** @type {import('next').NextConfig} */
const nextConfig = {
  module: {
    rules: [
      // Add this rule to handle .wasm files
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
      // Other rules like JavaScript, CSS, etc.
    ],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "img.clerk.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
