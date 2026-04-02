const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'src', 'generated', 'graphql.ts');
let s = fs.readFileSync(target, 'utf8');

s = s.replace(
  /export const CharactersDocument = new TypedDocumentString\(`([\s\S]*?)`\);/m,
  'export const CharactersDocument = `\n$1\n`;',
);

fs.writeFileSync(target, s);
