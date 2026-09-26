INSERT INTO settings (key, tenant_id, value)
VALUES ('customThemeHtml', '6e605d68-f2ef-4553-a1c3-5032124925fc', 'PLACEHOLDER_HTML')
ON CONFLICT(key) DO UPDATE SET value = excluded.value, tenant_id = excluded.tenant_id;
