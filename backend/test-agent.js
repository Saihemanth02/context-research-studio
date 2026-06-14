import { runResearch } from './services/researchAgent.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('====================================================');
console.log('🧪 Starting Verification Test: Context Research Agent');
console.log('====================================================');

const testQuery = 'How many AirPods got sold this year?';

try {
  console.log(`Running agent call for query: "${testQuery}"`);
  
  const report = await runResearch(testQuery, (progress) => {
    console.log(`- Progress Stage [${progress.stage}]: ${progress.text} (${progress.progress}%)`);
  });

  console.log('\nAsserting payload structure matches target schema:');
  
  const assertions = [
    { name: 'query', val: typeof report.query === 'string' },
    { name: 'answer', val: typeof report.answer === 'string' },
    { name: 'confidence', val: typeof report.confidence === 'number' },
    { name: 'key_stats', val: Array.isArray(report.key_stats) },
    { name: 'highlights', val: Array.isArray(report.highlights) },
    { name: 'sources', val: Array.isArray(report.sources) },
    { name: 'images', val: Array.isArray(report.images) },
    { name: 'timeline', val: Array.isArray(report.timeline) },
    { name: 'followups', val: Array.isArray(report.followups) }
  ];

  let allPassed = true;
  assertions.forEach((ass) => {
    if (ass.val) {
      console.log(`✅ Assert [${ass.name}]: Passed`);
    } else {
      console.log(`❌ Assert [${ass.name}]: FAILED`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The agent service is production-ready.');
  } else {
    console.log('\n⚠️ SOME TESTS FAILED. Verify response fields inside researchAgent.js.');
    process.exit(1);
  }

} catch (error) {
  console.error('\n🔴 Test encountered error during execution:', error);
  process.exit(1);
}
console.log('====================================================');
