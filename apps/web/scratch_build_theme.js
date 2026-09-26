const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../../Tema/Nuansa.net V.1.html'), 'utf8');
const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');

fs.writeFileSync(
  path.join(__dirname, 'src/theme.ts'),
  `export const defaultThemeHtml = \`${escapedContent}\`;\n`
);
console.log('Done!');
