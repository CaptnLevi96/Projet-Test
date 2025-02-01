const common = {
  requireModule: ['@babel/register'],
  require: ['tests/bdd/steps/*.js'],
  publishQuiet: false,
  format: ['progress']
};

module.exports = {
  default: {
    ...common,
    format: ['progress']
  }
};