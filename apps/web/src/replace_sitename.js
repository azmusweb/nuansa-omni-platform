const fs = require('fs');
let code = fs.readFileSync('index.tsx', 'utf8');
code = code.replace(/const siteName = settings\['siteName'\] \|\| 'Nuansa Network'/g, "const siteName = 'Nuansa Network'");
fs.writeFileSync('index.tsx', code);
