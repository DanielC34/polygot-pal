import type { NextConfig } from "next";
import dotenv from 'dotenv'

dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  eng: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
