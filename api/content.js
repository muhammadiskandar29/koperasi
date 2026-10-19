import { supabase, inMemoryStore, saveStore } from './lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const section = req.query?.section

  // GET: Ambil konten dinamis
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    if (supabase) {
      const query = supabase.from('koperasi_content').select('*')
      if (section) query.eq('id', section)
      
      const { data, error } = await query

      if (!error && data && data.length > 0) {
        if (section) {
          return res.status(200).json({ success: true, section, data: data[0].payload, source: 'supabase' })
        }
        const contentMap = {}
        data.forEach(row => {
          contentMap[row.id] = row.payload
        })
        return res.status(200).json({ success: true, data: { ...inMemoryStore.content, ...contentMap }, source: 'supabase' })
      }
    }

    if (section && inMemoryStore.content[section]) {
      return res.status(200).json({ success: true, section, data: inMemoryStore.content[section], source: 'local' })
    }

    return res.status(200).json({ success: true, data: inMemoryStore.content, source: 'local' })
  }

  // POST / PUT: Update Konten dari CMS Admin
  if (req.method === 'POST' || req.method === 'PUT') {
    const { section: targetSection, data: payload } = req.body || {}

    if (!targetSection || !payload) {
      return res.status(400).json({ success: false, message: 'Section dan Data konten wajib disertakan' })
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_content')
        .upsert({
          id: targetSection,
          payload: payload,
          updated_at: new Date().toISOString()
        })
        .select()

      if (!error) {
        if (Array.isArray(payload)) {
          inMemoryStore.content[targetSection] = payload
        } else if (typeof payload === 'object') {
          inMemoryStore.content[targetSection] = {
            ...(inMemoryStore.content[targetSection] || {}),
            ...payload
          }
        } else {
          inMemoryStore.content[targetSection] = payload
        }
        saveStore()
        return res.status(200).json({ success: true, message: `Konten [${targetSection}] berhasil disimpan ke Supabase`, data: payload })
      }
    }

    // Fallback in-memory + file persistence
    if (Array.isArray(payload)) {
      inMemoryStore.content[targetSection] = payload
    } else if (typeof payload === 'object') {
      inMemoryStore.content[targetSection] = {
        ...(inMemoryStore.content[targetSection] || {}),
        ...payload
      }
    } else {
      inMemoryStore.content[targetSection] = payload
    }

    saveStore()
    return res.status(200).json({ success: true, message: `Konten [${targetSection}] berhasil diperbarui`, data: inMemoryStore.content[targetSection] })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
