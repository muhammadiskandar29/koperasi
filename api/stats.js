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

  // GET: Ambil data statistik
  if (req.method === 'GET') {
    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_stats')
        .select('*')
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        return res.status(200).json({ success: true, data, source: 'supabase' })
      }
    }

    return res.status(200).json({ success: true, data: inMemoryStore.stats, source: 'local' })
  }

  // POST / PUT: Update data statistik dari CMS
  if (req.method === 'POST' || req.method === 'PUT') {
    const body = req.body || {}
    const { id, label, value, description } = body

    if (!id || !value) {
      return res.status(400).json({ success: false, message: 'ID dan Value statistik wajib diisi' })
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_stats')
        .upsert({ id, label, value, description, updated_at: new Date().toISOString() })
        .select()

      if (!error) {
        return res.status(200).json({ success: true, message: 'Statistik berhasil diperbarui di Supabase', data })
      }
    }

    // Fallback in-memory + file
    const existingIndex = inMemoryStore.stats.findIndex(item => item.id === id)
    if (existingIndex !== -1) {
      inMemoryStore.stats[existingIndex] = { ...inMemoryStore.stats[existingIndex], label, value, description }
    } else {
      inMemoryStore.stats.push({ id, label: label || id, value, description: description || '', sort_order: inMemoryStore.stats.length + 1 })
    }
    saveStore()
    return res.status(200).json({ success: true, message: 'Statistik berhasil diperbarui', data: inMemoryStore.stats })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
