import express, { Request, Response } from 'express';
import storageRoutes from './routes/storageRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Use storage routes
app.use('/api', storageRoutes); // Changed from /api/storages to /api to match the route defined in storageRoutes.ts

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
