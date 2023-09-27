import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { errorHandler, notFound } from './app/middlewares/errorMiddleware';
import routers from './app/routes';

// App
const app: Application = express();

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routers);

// Default api
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Express!');
});

// 404 error handling
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
