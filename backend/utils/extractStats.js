/**
 * Regex parser utility to extract key statistics, numeric valuations, 
 * and percentages from text content.
 */
export const extractStats = (text) => {
  if (!text) return [];

  const stats = [];
  
  // Patterns to look for:
  // 1. Percentages (e.g. 45%, 12.5 percent)
  // 2. Currencies (e.g. $157 billion, €12M, $29.8B)
  // 3. Large quantities (e.g. 82 million units, 2.1 million)
  const regexes = [
    /(\d+(?:\.\d+)?\s*%\s*(?:market share|growth|increase|decrease|share)?)/gi,
    /(\$\s*\d+(?:\.\d+)?\s*(?:billion|million|trillion|B|M|T))/gi,
    /(\d+(?:\.\d+)?\s*(?:million|billion)\s*(?:units|vehicles|devices|users|sales)?)/gi
  ];

  // Split text into sentences
  const sentences = text.split(/[.!?\n]+/);
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length < 15 || trimmed.length > 200) continue;

    for (const regex of regexes) {
      const match = trimmed.match(regex);
      if (match) {
        // Extract label (context of the sentence)
        let label = trimmed;
        // Truncate if too long
        if (label.length > 60) {
          label = label.substring(0, 57) + '...';
        }
        
        // Pick first value match
        const value = match[0];

        // Avoid pushing exact duplicates
        if (!stats.some(s => s.value === value)) {
          stats.push({
            label: label.replace(value, '___'),
            value: value,
            year: new Date().getFullYear().toString()
          });
        }
        break; // matched once for this sentence, move to next
      }
    }

    // Limit to maximum 6 extracted stats to avoid cluttering
    if (stats.length >= 6) break;
  }

  return stats;
};

export default {
  extractStats
};
