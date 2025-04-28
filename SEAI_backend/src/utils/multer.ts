import multer from 'multer';
import { Request, Response } from 'express';

// Configure Multer
const storage = multer.memoryStorage(); // Store file in memory
export const upload = multer({
  storage: storage,
});