<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login gagal, periksa email dan password.')
    }

    // Simpan token dan data user ke localStorage
    localStorage.setItem('kmlc_admin_token', data.token)
    localStorage.setItem('kmlc_admin_user', JSON.stringify(data.user))

    router.push('/admin')
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-card">
        <div class="brand-header">
          <router-link to="/" class="logo">
            <span class="logo-mark">KML</span><span class="logo-accent">C</span>
          </router-link>
          <h2>CMS Panel Pengurus</h2>
          <p>Koperasi Konsumen Makmur Lestari Cikawung</p>
        </div>

        <div v-if="errorMessage" class="alert-error">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Alamat Email Pengurus</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              placeholder="nama@kmlc.id" 
              required
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required
              autocomplete="current-password"
            />
          </div>

          <div class="credential-hint">
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Akun Default: <strong>admin@kmlc.id</strong> | Sandi: <strong>admin123</strong></span>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="!isLoading">Masuk ke Dashboard</span>
            <span v-else class="loading-state">Memverifikasi...</span>
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">&larr; Kembali ke Website Publik</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #022C22 0%, #064E3B 50%, #0F172A 100%);
  padding: 1.5rem;
}

.login-container {
  width: 100%;
  max-width: 440px;
}

.login-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.brand-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: inline-block;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}

.logo-mark {
  color: #064E3B;
}

.logo-accent {
  color: #D97706;
}

.brand-header h2 {
  font-size: 1.35rem;
  color: #0F172A;
  margin-bottom: 0.25rem;
  font-weight: 700;
}

.brand-header p {
  font-size: 0.875rem;
  color: #64748B;
}

.alert-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #991B1B;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 1.5px solid #CBD5E1;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;
  outline: none;
}

.form-group input:focus {
  border-color: #047857;
  box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.15);
}

.credential-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #F0FDF4;
  border: 1px dashed #86EFAC;
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 0.78rem;
  color: #166534;
}

.btn-submit {
  background: #064E3B;
  color: #ffffff;
  border: none;
  padding: 0.85rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  background: #047857;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #F1F5F9;
}

.back-link {
  font-size: 0.85rem;
  color: #047857;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 1rem 0.75rem;
  }
  .login-card {
    padding: 1.5rem 1.15rem;
    border-radius: 12px;
  }
  .brand-header {
    margin-bottom: 1.25rem;
  }
  .logo {
    font-size: 1.65rem;
    margin-bottom: 0.5rem;
  }
  .brand-header h2 {
    font-size: 1.15rem;
  }
  .brand-header p {
    font-size: 0.78rem;
  }
  .form-group label {
    font-size: 0.78rem;
  }
  .form-group input {
    padding: 0.68rem 0.75rem;
    font-size: 0.88rem;
  }
  .credential-hint {
    font-size: 0.72rem;
    padding: 0.5rem 0.65rem;
  }
  .btn-submit {
    padding: 0.75rem;
    font-size: 0.88rem;
  }
  .login-footer {
    margin-top: 1.25rem;
    padding-top: 1rem;
  }
}
</style>
