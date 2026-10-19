import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function localApiPlugin() {
  return {
    name: 'local-api-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next()
        
        try {
          const urlObj = new URL(req.url, 'http://localhost')
          const pathname = urlObj.pathname
          const routeName = pathname.replace('/api/', '').split('?')[0]

          let handlerModule = null
          if (routeName === 'stats') {
            handlerModule = await import('./api/stats.js')
          } else if (routeName === 'news') {
            handlerModule = await import('./api/news.js')
          } else if (routeName === 'programs') {
            handlerModule = await import('./api/programs.js')
          } else if (routeName === 'messages') {
            handlerModule = await import('./api/messages.js')
          } else if (routeName === 'auth') {
            handlerModule = await import('./api/auth.js')
          } else if (routeName === 'content') {
            handlerModule = await import('./api/content.js')
          } else if (routeName === 'activities') {
            handlerModule = await import('./api/activities.js')
          } else if (routeName === 'bootstrap') {
            handlerModule = await import('./api/bootstrap.js')
          } else {
            return next()
          }

          // Baca request body jika POST/PUT/PATCH
          let body = {}
          if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const buffers = []
            for await (const chunk of req) {
              buffers.push(chunk)
            }
            const raw = Buffer.concat(buffers).toString()
            if (raw) {
              try {
                body = JSON.parse(raw)
              } catch (e) {
                body = raw
              }
            }
          }

          req.query = Object.fromEntries(urlObj.searchParams)
          req.body = body

          // Response helpers agar kompatibel dengan Vercel serverless function
          res.status = (statusCode) => {
            res.statusCode = statusCode
            return res
          }
          res.json = (data) => {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json')
            }
            res.end(JSON.stringify(data))
            return res
          }

          await handlerModule.default(req, res)
        } catch (err) {
          console.error('Local API Error:', err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
          }
          res.end(JSON.stringify({ success: false, error: err.message }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), localApiPlugin()],
})
