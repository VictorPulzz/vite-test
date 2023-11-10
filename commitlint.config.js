// Commit structure by conventional commits:
// header: type(scope): subject
// body:
// footer:
module.exports = {
  rules: {
    'header-max-length': [2, 'always', 200],
    'scope-case': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', ['sentence-case']],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'pascal-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['Feat', 'Fix', 'Build', 'Ci', 'Docs', 'Style', 'Refactor', 'Test', 'Upgrade'],
    ],
  },
};
