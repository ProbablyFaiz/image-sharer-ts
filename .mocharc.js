'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  diff: true,
  exit: true,
  extension: ['js', 'ts', 'tsx'],
  file: './app/javascript/testHelpers.js',
  package: './package.json',
  r: [
    'esm',
    // 'ts-node/register',
    '@babel/register',
    'ignore-styles',
  ],
  recursive: true,
  reporter: 'spec',
  reporterOption: [
    'mochaFile=./test_reports/test-results.xml'
  ],
  slow: 75,
  timeout: 2000,
  ui: 'bdd'
};
