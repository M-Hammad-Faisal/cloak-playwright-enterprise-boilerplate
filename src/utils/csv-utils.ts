import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config/index.js';
import { Item } from '../types/index.js';

export const CSVUtils = {
  saveItems: async (items: Item[], filename: string = 'items.csv') => {
    // Ensure data directory exists
    if (!fs.existsSync(CONFIG.dataDir)) {
      fs.mkdirSync(CONFIG.dataDir, { recursive: true });
    }

    const filePath = path.join(CONFIG.dataDir, filename);
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'name', title: 'NAME' },
        { id: 'description', title: 'DESCRIPTION' },
        { id: 'price', title: 'PRICE' },
      ],
    });

    await csvWriter.writeRecords(items);
    return filePath;
  },
};
