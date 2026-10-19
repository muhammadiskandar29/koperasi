import { supabase, inMemoryStore, saveStore } from './lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // GET: Daftar Program Koperasi
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_programs')
        .select('*')
        .order('id', { ascending: true })

      if (!error && data) {
        return res.status(200).json({ success: true, data, source: 'supabase' })
      }
    }

    return res.status(200).json({ success: true, data: inMemoryStore.programs, source: 'local' })
  }

  // POST: Tambah Program Baru
  if (req.method === 'POST') {
    const { title, badge, description, benefits, is_active } = req.body || {}

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Judul dan deskripsi program wajib diisi' })
    }

    const benefitsArray = Array.isArray(benefits) 
      ? benefits 
      : (typeof benefits === 'string' ? benefits.split(',').map(s => s.trim()) : [])

    const newProgram = {
      title,
      badge: badge || 'Layanan',
      description,
      benefits: benefitsArray,
      is_active: is_active !== false,
      created_at: new Date().toISOString()
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_programs')
        .insert([newProgram])
        .select()

      if (!error && data && data.length > 0) {
        return res.status(201).json({ success: true, message: 'Program berhasil dibuat di Supabase', data: data[0] })
      }
    }

    const fallbackProg = { ...newProgram, id: Date.now() }
    inMemoryStore.programs.push(fallbackProg)
    saveStore()
    return res.status(201).json({ success: true, message: 'Program berhasil dibuat', data: fallbackProg })
  }

  // PUT: Update Program
  if (req.method === 'PUT') {
    const { id, title, badge, description, benefits, is_active } = req.body || {}

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID Program wajib disertakan' })
    }

    const benefitsArray = Array.isArray(benefits) 
      ? benefits 
      : (typeof benefits === 'string' ? benefits.split(',').map(s => s.trim()) : undefined)

    if (supabase) {
      const updateData = {
        title,
        badge,
        description,
        is_active
      }
      if (benefitsArray) updateData.benefits = benefitsArray

      const { data, error } = await supabase
        .from('koperasi_programs')
        .update(updateData)
        .eq('id', id)
        .select()

      if (!error && data) {
        return res.status(200).json({ success: true, message: 'Program berhasil diperbarui di Supabase', data: data[0] })
      }
    }

    const idx = inMemoryStore.programs.findIndex(p => String(p.id) === String(id))
    if (idx !== -1) {
      inMemoryStore.programs[idx] = {
        ...inMemoryStore.programs[idx],
        title: title || inMemoryStore.programs[idx].title,
        badge: badge || inMemoryStore.programs[idx].badge,
        description: description || inMemoryStore.programs[idx].description,
        benefits: benefitsArray || inMemoryStore.programs[idx].benefits,
        is_active: is_active !== undefined ? is_active : inMemoryStore.programs[idx].is_active
      }
      saveStore()
      return res.status(200).json({ success: true, message: 'Program berhasil diperbarui', data: inMemoryStore.programs[idx] })
    }

    return res.status(404).json({ success: false, message: 'Program tidak ditemukan' })
  }

  // DELETE: Hapus Program
  if (req.method === 'DELETE') {
    const id = req.query?.id || req.body?.id

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID Program wajib disertakan' })
    }

    if (supabase) {
      const { error } = await supabase
        .from('koperasi_programs')
        .delete()
        .eq('id', id)

      if (!error) {
        return res.status(200).json({ success: true, message: 'Program berhasil dihapus dari Supabase' })
      }
    }

    inMemoryStore.programs = inMemoryStore.programs.filter(p => String(p.id) !== String(id))
    saveStore()
    return res.status(200).json({ success: true, message: 'Program berhasil dihapus' })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
