import fs from 'fs';

const content = fs.readFileSync('scripts/theme.js', 'utf8');

const queries = ['js-header-logo-text-group', 'js-header-logo-text', 'js-header-logo'];
queries.forEach(query => {
  let index = 0;
  while ((index = content.indexOf(query, index)) !== -1) {
    console.log(`Found "${query}" at ${index}:`, content.substring(index - 50, index + 100));
    index += query.length;
  }
});
