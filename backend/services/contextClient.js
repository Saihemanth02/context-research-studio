import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CONTEXT_API_URL = 'https://api.context.dev/v1'; // Base URL config
const CONTEXT_API_KEY = process.env.CONTEXT_API_KEY;

// Create Axios client with authorization headers
const client = axios.create({
  baseURL: CONTEXT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CONTEXT_API_KEY || ''}`
  }
});

/**
 * Scrape a specific URL to retrieve its clean markdown/HTML content
 * Endpoint structure: POST /scrape
 */
export const scrapeUrl = async (url) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    // Note: Adjust endpoint name/payload format according to official Context.dev specs
    const response = await client.post('/scrape', { url, formats: ['markdown'] });
    return response.data;
  } catch (error) {
    console.error(`Error scraping URL (${url}):`, error.message);
    throw error;
  }
};

/**
 * Crawl a website starting from a root URL
 * Endpoint structure: POST /crawl
 */
export const crawlSite = async (url) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    // Note: Adjust endpoint name/payload format according to official Context.dev specs
    const response = await client.post('/crawl', { url });
    return response.data;
  } catch (error) {
    console.error(`Error crawling site (${url}):`, error.message);
    throw error;
  }
};

/**
 * Extract structured facts based on a custom JSON schema from a website
 * Endpoint structure: POST /extract
 */
export const extractStructuredData = async (url, schema) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    // Note: Adjust endpoint name/payload format according to official Context.dev specs
    const response = await client.post('/extract', { url, schema });
    return response.data;
  } catch (error) {
    console.error(`Error extracting structured data from (${url}):`, error.message);
    throw error;
  }
};

/**
 * Get screenshot image of a specific URL
 * Endpoint structure: POST /screenshot
 */
export const getScreenshot = async (url) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    // Note: Adjust endpoint name/payload format according to official Context.dev specs
    const response = await client.post('/screenshot', { url });
    return response.data;
  } catch (error) {
    console.error(`Error fetching screenshot for (${url}):`, error.message);
    throw error;
  }
};

/**
 * Retrieve logo and brand information for a specific domain name
 * Endpoint structure: GET /brand
 */
export const getBrandData = async (domain) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    // Note: Adjust endpoint name/parameters according to official Context.dev specs
    const response = await client.get(`/brand`, { params: { domain } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching brand data for domain (${domain}):`, error.message);
    throw error;
  }
};

/**
 * Search the web and scrape results to markdown in one call
 * Endpoint structure: POST /web/search
 */
export const webSearch = async (query) => {
  if (!CONTEXT_API_KEY) {
    throw new Error('CONTEXT_API_KEY is not configured.');
  }
  try {
    const response = await client.post('/web/search', {
      query,
      markdownOptions: {
        enabled: true,
        useMainContentOnly: true
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error performing web search for (${query}):`, error.message);
    throw error;
  }
};

export default {
  scrapeUrl,
  crawlSite,
  extractStructuredData,
  getScreenshot,
  getBrandData,
  webSearch
};

