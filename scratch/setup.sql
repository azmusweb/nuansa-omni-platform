UPDATE tenants SET plan = 'super_admin' WHERE id = (SELECT tenant_id FROM users WHERE email = 'azmus@ymail.com');

INSERT INTO domains (id, tenant_id, domain, is_active, created_at)
SELECT 'dom-nuansa-net', tenant_id, 'nuansa.net', 1, 1790220000000 
FROM users WHERE email = 'azmus@ymail.com'
ON CONFLICT(domain) DO UPDATE SET tenant_id = excluded.tenant_id, is_active = 1;

INSERT INTO domains (id, tenant_id, domain, is_active, created_at)
SELECT 'dom-www-nuansa-net', tenant_id, 'www.nuansa.net', 1, 1790220000000 
FROM users WHERE email = 'azmus@ymail.com'
ON CONFLICT(domain) DO UPDATE SET tenant_id = excluded.tenant_id, is_active = 1;
