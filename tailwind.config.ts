import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Quét sạch mọi thứ trong src cho chắc
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;