import { supabase, inMemoryStore } from './lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // GET: Daftar Pesan Masuk (untuk CMS Admin)
  if (req.method === 'GET') {
    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        return res.status(200).json({ success: true, data, source: 'supabase' })
      }
    }

    return res.status(200).json({ success: true, data: inMemoryStore.messages, source: 'local' })
  }

  // POST: Kirim Pesan Baru (dari Form Kontak Website Publik)
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body || {}

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Nama dan pesan wajib diisi' })
    }

    const newMessage = {
      name,
      email: email || '',
      phone: phone || '',
      subject: subject || 'Pertanyaan Umum',
      message,
      is_read: false,
      created_at: new Date().toISOString()
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('koperasi_messages')
        .insert([newMessage])
        .select()

      if (!error && data && data.length > 0) {
        return res.status(201).json({ success: true, message: 'Pesan Anda berhasil dikirim ke pengurus koperasi', data: data[0] })
      }
    }

    const fallbackMsg = { ...newMessage, id: Date.now() }
    inMemoryStore.messages.unshift(fallbackMsg)
    return res.status(201).json({ success: true, message: 'Pesan Anda berhasil dikirim ke pengurus koperasi', data: fallbackMsg })
  }

  // PATCH: Tandai pesan sudah dibaca
  if (req.method === 'PATCH') {
    const { id, is_read } = req.body || {}

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID Pesan diperlukan' })
    }

    if (supabase) {
      const { error } = await supabase
        .from('koperasi_messages')
        .update({ is_read: is_read !== false })
        .eq('id', id)

      if (!error) {
        return res.status(200).json({ success: true, message: 'Status pesan berhasil diperbarui' })
      }
    }

    const msg = inMemoryStore.messages.find(m => String(m.id) === String(id))
    if (msg) {
      msg.is_read = is_read !== false
      return res.status(200).json({ success: true, message: 'Status pesan berhasil diperbarui' })
    }

    return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' })
  }

  return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
}
