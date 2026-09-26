const fs = require('fs');
const { execSync } = require('child_process');

try {
  const query = `UPDATE settings SET value = 'Nuansa Network' WHERE key='siteName'`;
  fs.writeFileSync('d:/azmus/Nuansa Studio/scratch/temp_query.sql', query);
  
  console.log('Running update...');
  const output = execSync('cmd /c node ..\\..\\node_modules\\wrangler\\bin\\wrangler.js d1 execute nuansa-master-db --local --file=../../scratch/temp_query.sql', {
    cwd: 'd:/azmus/Nuansa Studio/apps/web',
    encoding: 'utf8'
  });
  console.log(output);
} catch (e) {
  console.error(e);
}
