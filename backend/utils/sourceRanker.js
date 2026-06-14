/**
 * Rates the credibility of a website based on its domain suffix and name patterns.
 * Calculates score (0 to 100) and categorizes source type.
 */
export const rankSource = (url) => {
  if (!url) return { score: 50, category: 'BLOG', publisher: 'Unknown' };

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // Extract a friendly name for the publisher
    let publisher = hostname.replace('www.', '');
    const parts = publisher.split('.');
    if (parts.length > 1) {
      publisher = parts[parts.length - 2].charAt(0).toUpperCase() + parts[parts.length - 2].slice(1);
    }

    // Identify Government sites
    if (hostname.endsWith('.gov') || hostname.includes('.gov.')) {
      return {
        score: 98,
        category: 'GOVERNMENT',
        publisher: `${publisher} (Official Gov)`
      };
    }

    // Identify Academic/Educational sites
    if (hostname.endsWith('.edu') || hostname.includes('.edu.')) {
      return {
        score: 95,
        category: 'ACADEMIC',
        publisher: `${publisher} Institution`
      };
    }

    // Identify reputable market research/firm websites
    const researchFirms = ['gartner.com', 'idc.com', 'statista.com', 'canalys.com', 'mckinsey.com', 'pewresearch.org', 'forrester.com'];
    if (researchFirms.some(firm => hostname.includes(firm))) {
      return {
        score: 92,
        category: 'RESEARCH_FIRM',
        publisher: `${publisher} Research`
      };
    }

    // Identify news sites
    const newsSites = ['bloomberg.com', 'reuters.com', 'wsj.com', 'nytimes.com', 'ft.com', 'cnbc.com', 'techcrunch.com', 'forbes.com', 'wired.com', 'venturebeat.com'];
    if (newsSites.some(news => hostname.includes(news))) {
      return {
        score: 88,
        category: 'NEWS',
        publisher: publisher
      };
    }

    // Default commercial or generic blog
    return {
      score: 65,
      category: 'BLOG',
      publisher: publisher
    };
  } catch (error) {
    // If URL parsing fails
    return {
      score: 55,
      category: 'BLOG',
      publisher: 'Web Reference'
    };
  }
};

export default {
  rankSource
};
