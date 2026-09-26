const { execSync } = require('child_process');

try {
  // Get user tenant
  const userQuery = `SELECT * FROM users WHERE email = 'azmus@ymail.com'`;
  console.log('Querying user...');
  const userResultStr = execSync(`npx wrangler d1 execute nuansa-master-db --remote --command="${userQuery}" --json`).toString();
  const userResult = JSON.parse(userResultStr);
  
  if (!userResult[0].results.length) {
    console.log('User not found!');
    process.exit(1);
  }
  
  const tenantId = userResult[0].results[0].tenant_id;
  console.log('Found tenant:', tenantId);

  // Update plan
  const updatePlanQuery = `UPDATE tenants SET plan = 'super_admin' WHERE id = '${tenantId}'`;
  execSync(`npx wrangler d1 execute nuansa-master-db --remote --command="${updatePlanQuery}"`);
  console.log('Plan updated to super_admin');

  // Insert domain
  const insertDomainQuery = `INSERT INTO domains (id, tenant_id, domain, is_active) VALUES ('dom-${Date.now()}', '${tenantId}', 'nuansa.net', 1) ON CONFLICT(domain) DO UPDATE SET tenant_id = '${tenantId}', is_active = 1`;
  execSync(`npx wrangler d1 execute nuansa-master-db --remote --command="${insertDomainQuery}"`);
  
  const insertWwwQuery = `INSERT INTO domains (id, tenant_id, domain, is_active) VALUES ('dom-www-${Date.now()}', '${tenantId}', 'www.nuansa.net', 1) ON CONFLICT(domain) DO UPDATE SET tenant_id = '${tenantId}', is_active = 1`;
  execSync(`npx wrangler d1 execute nuansa-master-db --remote --command="${insertWwwQuery}"`);
  console.log('Domain mapped to tenant');

  // Delete cloudflare pages project if it exists? We will just list them for now.
  console.log('Checking Pages projects...');
  try {
    const pagesList = execSync(`npx wrangler pages project list`).toString();
    console.log('Pages:', pagesList);
  } catch(e) {
    console.log('Could not list pages');
  }

} catch (e) {
  console.error(e.toString());
}
