import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import researchRouter from './routes/research.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app can communicate with the backend
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Routes configuration
app.use('/api/research', researchRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    timestamp: new Date(),
    contextApiConfigured: !!process.env.CONTEXT_API_KEY
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 Context Research Studio Server running on http://localhost:${PORT}`);
  console.log(`🔑 Context.dev API Key: ${process.env.CONTEXT_API_KEY ? 'CONFIGURED' : 'MISSING (Running in Demo Mode)'}`);
  console.log(`=============================================`);
});
