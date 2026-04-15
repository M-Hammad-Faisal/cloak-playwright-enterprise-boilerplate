import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONFIG = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  outputDir: path.resolve(__dirname, '../../output'),
  screenshotsDir: path.resolve(__dirname, '../../output/screenshots'),
  dataDir: path.resolve(__dirname, '../../output/data'),
  browser: {
    headless: process.env.HEADLESS === 'true',
  },
  credentials: {
    standard: {
      user: process.env.SAUCE_USERNAME || '',
      pass: process.env.SAUCE_PASSWORD || '',
    },
  },
};
