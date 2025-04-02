import type { NextConfig } from "next";
import dotenv from 'dotenv'

dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
