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

  // GET: Daftar Berita & Kegiatan
  if (req.method === 'GET') {
    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_news')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        return res.status(200).json({ success: true, data, source: 'supabase' })
      }
    }

    return res.status(200).json({ success: true, data: inMemoryStore.news, source: 'local' })
  }

  // POST: Tambah Berita Baru dari CMS
  if (req.method === 'POST') {
    const { title, category, image_url, summary, content, is_published } = req.body || {}

    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Judul dan ringkasan berita wajib diisi' })
    }

    const newArticle = {
      title,
      category: category || 'Kegiatan',
      image_url: image_url || '/assets/images/harvest.jpg',
      summary,
      content: content || summary,
      is_published: is_published !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_news')
        .insert([newArticle])
        .select()

      if (!error && data && data.length > 0) {
        return res.status(201).json({ success: true, message: 'Berita berhasil diterbitkan ke Supabase', data: data[0] })
      }
    }

    // Fallback in-memory + file
    const fallbackArticle = { ...newArticle, id: Date.now() }
    inMemoryStore.news.unshift(fallbackArticle)
    saveStore()
    return res.status(201).json({ success: true, message: 'Berita berhasil ditambahkan', data: fallbackArticle })
  }

  // PUT: Update Berita dari CMS
  if (req.method === 'PUT') {
    const { id, title, category, image_url, summary, content, is_published } = req.body || {}

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID Berita wajib disertakan' })
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_news')
        .update({
          title,
          category,
          image_url,
          summary,
          content,
          is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (!error && data) {
        return res.status(200).json({ success: true, message: 'Berita berhasil diperbarui di Supabase', data: data[0] })
      }
    }

    const idx = inMemoryStore.news.findIndex(item => String(item.id) === String(id))
    if (idx !== -1) {
      inMemoryStore.news[idx] = {
        ...inMemoryStore.news[idx],
        title: title || inMemoryStore.news[idx].title,
        category: category || inMemoryStore.news[idx].category,
        image_url: image_url || inMemoryStore.news[idx].image_url,
        summary: summary || inMemoryStore.news[idx].summary,
        content: content !== undefined ? content : inMemoryStore.news[idx].content,
        is_published: is_published !== undefined ? is_published : inMemoryStore.news[idx].is_published,
        updated_at: new Date().toISOString()
      }
      saveStore()
      return res.status(200).json({ success: true, message: 'Berita berhasil diperbarui', data: inMemoryStore.news[idx] })
    }

    return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' })
  }

  // DELETE: Hapus Berita
  if (req.method === 'DELETE') {
    const id = req.query?.id || req.body?.id

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID Berita wajib disertakan' })
    }

    if (supabase) {
      const { error } = await supabase
        .from('koperasi_news')
        .delete()
        .eq('id', id)

      if (!error) {
        return res.status(200).json({ success: true, message: 'Berita berhasil dihapus dari Supabase' })
      }
    }

    inMemoryStore.news = inMemoryStore.news.filter(item => String(item.id) !== String(id))
    saveStore()
    return res.status(200).json({ success: true, message: 'Berita berhasil dihapus' })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
