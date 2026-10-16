import { supabase } from './lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metode tidak didukung' })
  }

  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' })
  }

  // Cek ke Supabase Auth jika tersedia
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (!error && data?.session) {
        return res.status(200).json({
          success: true,
          message: 'Login berhasil via Supabase Auth',
          token: data.session.access_token,
          user: {
            id: data.user.id,
            email: data.user.email,
            role: 'Admin KMLC'
          }
        })
      }
    } catch (e) {
      // lanjut ke fallback credential jika supabase auth belum diset
    }
  }

  // Fallback Akun Pengurus Koperasi KMLC Default
  const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || 'admin@kmlc.id'
  const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

  if (email.trim().toLowerCase() === DEFAULT_EMAIL.toLowerCase() && password === DEFAULT_PASSWORD) {
    const dummyToken = 'kmlc_jwt_' + Buffer.from(email + ':' + Date.now()).toString('base64')
    return res.status(200).json({
      success: true,
      message: 'Login berhasil (Kredensial Pengurus KMLC)',
      token: dummyToken,
      user: {
        id: 'admin-kmlc-1',
        email: DEFAULT_EMAIL,
        name: 'Administrator KMLC',
        role: 'Super Admin Koperasi'
      }
    })
  }

  return res.status(401).json({
    success: false,
    message: 'Email atau password yang Anda masukkan salah. (Default: admin@kmlc.id / admin123)'
  })
}
