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

  // GET: Ambil daftar seluruh aktivitas / dokumentasi kegiatan
  if (req.method === 'GET') {
    if (supabase) {
      // 1. Cek apakah ada tabel koperasi_activities langsung
      try {
        const { data, error } = await supabase
          .from('koperasi_activities')
          .select('*')
          .order('id', { ascending: false })

        if (!error && data) {
          return res.status(200).json({ success: true, data, source: 'supabase-table' })
        }
      } catch (e) {
        // Fallthrough ke koperasi_content
      }

      // 2. Cek di tabel koperasi_content dengan id = 'activities'
      try {
        const { data, error } = await supabase
          .from('koperasi_content')
          .select('payload')
          .eq('id', 'activities')
          .maybeSingle()

        if (!error && data && Array.isArray(data.payload)) {
          return res.status(200).json({ success: true, data: data.payload, source: 'supabase-content' })
        }
      } catch (e) {
        // Fallthrough
      }
    }

    const localList = inMemoryStore.content?.activities || []
    return res.status(200).json({ success: true, data: localList, source: 'local' })
  }

  // POST: Tambah dokumentasi kegiatan baru
  if (req.method === 'POST') {
    const item = req.body || {}
    if (!item.title || !item.media_url) {
      return res.status(400).json({ success: false, message: 'Judul kegiatan dan URL media (foto/video) wajib diisi' })
    }

    const newActivity = {
      id: Date.now(),
      type: item.type || (item.media_url.endsWith('.mp4') ? 'video' : 'image'),
      title: item.title,
      category: item.category || 'Pembukaan Lahan',
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || item.media_url,
      date: item.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: item.time || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      location: item.location || 'Kawasan Lahan KMLC',
      district: item.district || 'Kec. Terisi',
      regency: item.regency || 'Kab. Indramayu, Jawa Barat',
      coordinates: item.coordinates || '-',
      altitude: item.altitude || '-',
      equipment: item.equipment || '-',
      description: item.description || ''
    }

    if (supabase) {
      // Coba insert ke koperasi_activities jika ada
      try {
        const { data, error } = await supabase
          .from('koperasi_activities')
          .insert([newActivity])
          .select()

        if (!error && data && data.length > 0) {
          return res.status(201).json({ success: true, message: 'Dokumentasi berhasil disimpan ke Supabase', data: data[0] })
        }
      } catch (e) {}

      // Fallback update ke koperasi_content
      try {
        const { data: cur } = await supabase.from('koperasi_content').select('payload').eq('id', 'activities').maybeSingle()
        const curList = cur && Array.isArray(cur.payload) ? cur.payload : (inMemoryStore.content?.activities || [])
        const updatedList = [newActivity, ...curList]

        await supabase.from('koperasi_content').upsert({
          id: 'activities',
          payload: updatedList,
          updated_at: new Date().toISOString()
        })

        inMemoryStore.content.activities = updatedList
        saveStore()
        return res.status(201).json({ success: true, message: 'Dokumentasi berhasil disimpan', data: newActivity })
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Gagal menyimpan ke Supabase: ' + err.message })
      }
    }

    inMemoryStore.content = inMemoryStore.content || {}
    inMemoryStore.content.activities = inMemoryStore.content.activities || []
    inMemoryStore.content.activities.unshift(newActivity)
    saveStore()

    return res.status(201).json({ success: true, message: 'Dokumentasi berhasil ditambahkan', data: newActivity })
  }

  // PUT: Perbarui dokumentasi kegiatan
  if (req.method === 'PUT') {
    const item = req.body || {}
    if (!item.id) {
      return res.status(400).json({ success: false, message: 'ID kegiatan wajib disertakan' })
    }

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('koperasi_activities')
          .update(item)
          .eq('id', item.id)
          .select()

        if (!error && data && data.length > 0) {
          return res.status(200).json({ success: true, message: 'Dokumentasi berhasil diperbarui di Supabase', data: data[0] })
        }
      } catch (e) {}

      try {
        const { data: cur } = await supabase.from('koperasi_content').select('payload').eq('id', 'activities').maybeSingle()
        let curList = cur && Array.isArray(cur.payload) ? cur.payload : (inMemoryStore.content?.activities || [])
        curList = curList.map(a => String(a.id) === String(item.id) ? { ...a, ...item } : a)

        await supabase.from('koperasi_content').upsert({
          id: 'activities',
          payload: curList,
          updated_at: new Date().toISOString()
        })

        inMemoryStore.content.activities = curList
        saveStore()
        return res.status(200).json({ success: true, message: 'Dokumentasi berhasil diperbarui', data: item })
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Gagal update di Supabase: ' + err.message })
      }
    }

    inMemoryStore.content = inMemoryStore.content || {}
    const list = inMemoryStore.content.activities || []
    inMemoryStore.content.activities = list.map(a => String(a.id) === String(item.id) ? { ...a, ...item } : a)
    saveStore()

    return res.status(200).json({ success: true, message: 'Dokumentasi berhasil diperbarui', data: item })
  }

  // DELETE: Hapus dokumentasi kegiatan
  if (req.method === 'DELETE') {
    const id = req.query?.id || req.body?.id
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID kegiatan wajib disertakan' })
    }

    if (supabase) {
      try {
        const { error } = await supabase
          .from('koperasi_activities')
          .delete()
          .eq('id', id)

        if (!error) {
          return res.status(200).json({ success: true, message: 'Dokumentasi berhasil dihapus dari Supabase' })
        }
      } catch (e) {}

      try {
        const { data: cur } = await supabase.from('koperasi_content').select('payload').eq('id', 'activities').maybeSingle()
        let curList = cur && Array.isArray(cur.payload) ? cur.payload : (inMemoryStore.content?.activities || [])
        curList = curList.filter(a => String(a.id) !== String(id))

        await supabase.from('koperasi_content').upsert({
          id: 'activities',
          payload: curList,
          updated_at: new Date().toISOString()
        })

        inMemoryStore.content.activities = curList
        saveStore()
        return res.status(200).json({ success: true, message: 'Dokumentasi berhasil dihapus' })
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Gagal menghapus dari Supabase: ' + err.message })
      }
    }

    inMemoryStore.content = inMemoryStore.content || {}
    const list = inMemoryStore.content.activities || []
    inMemoryStore.content.activities = list.filter(a => String(a.id) !== String(id))
    saveStore()

    return res.status(200).json({ success: true, message: 'Dokumentasi berhasil dihapus' })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
