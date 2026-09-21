import { Hono } from 'hono'
import { Dashboard } from './pages/Dashboard'
import { Posts } from './pages/Posts'
import { Appearance } from './pages/Appearance'
import { Vault } from './pages/Vault'

const app = new Hono()

// Rute Pengalihan (Redirect)
app.get('/', (c) => c.redirect('/dashboard'))

// Rute Dasbor
app.get('/dashboard', (c) => {
  return c.html(<Dashboard currentPath={c.req.path} />)
})

// Rute Artikel (Nuansa Nodes)
app.get('/posts', (c) => {
  return c.html(<Posts currentPath={c.req.path} />)
})

// Rute Tampilan (Nuansa Architect)
app.get('/appearance', (c) => {
  return c.html(<Appearance currentPath={c.req.path} />)
})

// Rute Media (Nuansa Vault)
app.get('/vault', (c) => {
  return c.html(<Vault currentPath={c.req.path} />)
})

// Rute Pengaturan Sementara
app.get('/settings', (c) => {
  return c.html(<Dashboard currentPath={c.req.path} />) // Menggunakan Dashboard sebagai placeholder
})

export default app
