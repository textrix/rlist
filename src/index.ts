import express, { Request, Response } from 'express';
import storageRoutes from './routes/storageRoutes';
import { getStoragesController } from './controllers/storageController'; // Import getStoragesController

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// New GET route for /
app.get('/', getStoragesController);

// Use storage routes
app.use('/api', storageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
