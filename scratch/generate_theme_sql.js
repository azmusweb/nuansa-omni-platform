const fs = require('fs');

const html = fs.readFileSync('Tema/Nuansa.net V.1.html', 'utf8');
const escapedHtml = html.replace(/'/g, "''");
const tenantId = '6e605d68-f2ef-4553-a1c3-5032124925fc';

const sql = `INSERT INTO settings (key, tenant_id, value)\nVALUES ('customThemeHtml', '${tenantId}', '${escapedHtml}')\nON CONFLICT(key) DO UPDATE SET value = excluded.value, tenant_id = excluded.tenant_id;\n`;

fs.writeFileSync('scratch/update_theme.sql', sql);
console.log('update_theme.sql generated, size:', sql.length, 'bytes');
