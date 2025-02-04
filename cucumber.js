// cucumber.js
module.exports = {
  default: {
    paths: ['tests/bdd/features/*.feature'],
    require: ['tests/bdd/features/steps/*.js'],
    requireModule: ['@babel/register'],
    format: ['progress', 'html:reports/cucumber-report.html']
  }
};