import express from 'express';
import { runResearch } from '../services/researchAgent.js';

const router = express.Router();

/**
 * POST /api/research
 * Initiates the multi-agent research pipeline for a user-specified query.
 * Input payload: { "query": "..." }
 */
router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Research query is required.' });
  }

  try {
    console.log(`Starting research for query: "${query}"`);
    
    // Execute research agents pipeline
    // Pass progress handler to log state updates in console
    const report = await runResearch(query, (progressInfo) => {
      console.log(`[Stage: ${progressInfo.stage}] - ${progressInfo.text} (${progressInfo.progress}%)`);
    });

    return res.status(200).json(report);
  } catch (error) {
    console.error('Error in research route:', error);
    return res.status(500).json({ 
      error: 'An internal error occurred during research execution.', 
      details: error.message 
    });
  }
});

export default router;
export { router };
