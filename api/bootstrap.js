import { supabase, inMemoryStore } from './lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const result = {
    stats: inMemoryStore.stats || [],
    news: inMemoryStore.news || [],
    activities: inMemoryStore.content?.activities || [],
    programs: inMemoryStore.programs || [],
    messages: inMemoryStore.messages || [],
    content: inMemoryStore.content || {}
  }

  if (supabase) {
    try {
      const fetchWithTimeout = Promise.race([
        Promise.all([
          supabase.from('koperasi_stats').select('*').order('sort_order', { ascending: true }),
          supabase.from('koperasi_news').select('*').order('created_at', { ascending: false }),
          supabase.from('koperasi_programs').select('*').order('id', { ascending: true }),
          supabase.from('koperasi_messages').select('*').order('created_at', { ascending: false }),
          supabase.from('koperasi_content').select('*')
        ]),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 2500))
      ])

      const [statsRes, newsRes, progRes, msgRes, contentRes] = await fetchWithTimeout

      if (!statsRes.error && statsRes.data && statsRes.data.length > 0) {
        result.stats = statsRes.data
      }
      if (!newsRes.error && newsRes.data && newsRes.data.length > 0) {
        result.news = newsRes.data
      }
      if (!progRes.error && progRes.data && progRes.data.length > 0) {
        result.programs = progRes.data
      }
      if (!msgRes.error && msgRes.data) {
        result.messages = msgRes.data
      }
      if (!contentRes.error && contentRes.data && contentRes.data.length > 0) {
        const contentMap = {}
        contentRes.data.forEach(row => {
          contentMap[row.id] = row.payload
        })
        result.content = { ...inMemoryStore.content, ...contentMap }
        if (Array.isArray(contentMap.activities)) {
          result.activities = contentMap.activities
        }
      }
    } catch (e) {
      // Fallback seamlessly to local in-memory store
    }
  }

  return res.status(200).json({ success: true, data: result })
}
