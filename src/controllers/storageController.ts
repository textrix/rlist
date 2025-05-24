import { Request, Response } from 'express';
import { getStorages } from '../services/rcloneService';

export async function getStoragesController(req: Request, res: Response): Promise<void> {
  try {
    const storages = await getStorages();
    if (storages.length > 0) {
      res.status(200).json(storages);
    } else {
      res.status(404).json({ message: 'No storages found or error fetching storages.' });
    }
  } catch (error: any) {
    console.error('Error in getStoragesController:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
