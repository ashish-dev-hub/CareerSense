const gapAnalysis = require('./gapAnalysis');
const roadmap = require('./roadmap');
const projectGenerator = require('./projectGenerator');

module.exports = {
  ...gapAnalysis,
  ...roadmap,
  ...projectGenerator
};
