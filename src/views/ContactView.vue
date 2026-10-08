<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
import { ref } from 'vue'

const formData = ref({
  name: '',
  phone: '',
  topic: 'kemitraan',
  message: ''
})

const isSubmitted = ref(false)

const submitForm = () => {
  // Simulate network request
  setTimeout(() => {
    isSubmitted.value = true
    formData.value = { name: '', phone: '', topic: 'kemitraan', message: '' }
    setTimeout(() => isSubmitted.value = false, 5000)
  }, 800)
}
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Pusat Bantuan</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Hubungi KMLC</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Kami siap berdiskusi mengenai peluang kemitraan, pertanyaan seputar keanggotaan, atau dukungan operasional pertanian Anda.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="contact-grid">
          
          <!-- Contact Info -->
          <div class="contact-info animate-fade-up">
            <h2 class="mb-4">Informasi Kantor</h2>
            <p class="text-muted mb-5">
              Kantor operasional utama kami berlokasi strategis di pusat sentra agrikultur Indramayu untuk mempermudah akses pelayanan bagi seluruh mitra KTH.
            </p>

            <div class="info-blocks">
              <BaseCard class="info-card">
                <div class="info-icon">📍</div>
                <div>
                  <h4>Alamat Kantor</h4>
                  <p class="text-muted">Desa Cikawung, Kec. Terisi,<br>Kab. Indramayu, Jawa Barat 45262</p>
                </div>
              </BaseCard>

              <BaseCard class="info-card">
                <div class="info-icon">📞</div>
                <div>
                  <h4>Telepon & WhatsApp</h4>
                  <p class="text-muted">Telepon: (0234) 567890<br>WA: 0812-3456-7890 (Admin)</p>
                </div>
              </BaseCard>

              <BaseCard class="info-card">
                <div class="info-icon">✉️</div>
                <div>
                  <h4>Email Resmi</h4>
                  <p class="text-muted">info@kmlc.co.id<br>kemitraan@kmlc.co.id</p>
                </div>
              </BaseCard>
            </div>
          </div>

          <!-- Interactive Form -->
          <div class="form-wrapper animate-fade-up" style="animation-delay: 0.2s">
            <BaseCard class="form-card">
              <h3 class="mb-4">Kirim Pesan Langsung</h3>
              
              <transition name="fade">
                <div v-if="isSubmitted" class="alert-success">
                  ✅ Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda kembali.
                </div>
              </transition>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-group">
                  <label for="name">Nama Lengkap / Instansi</label>
                  <input type="text" id="name" v-model="formData.name" required placeholder="Masukkan nama Anda" />
                </div>
                
                <div class="form-group">
                  <label for="phone">Nomor WhatsApp</label>
                  <input type="tel" id="phone" v-model="formData.phone" required placeholder="0812xxxxxx" />
                </div>
                
                <div class="form-group">
                  <label for="topic">Topik Pembicaraan</label>
                  <select id="topic" v-model="formData.topic">
                    <option value="kemitraan">Kemitraan Lahan</option>
                    <option value="pembiayaan">Pembiayaan Saprotan</option>
                    <option value="anggota">Pendaftaran Anggota</option>
                    <option value="lainnya">Pertanyaan Lainnya</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message">Pesan Anda</label>
                  <textarea id="message" v-model="formData.message" rows="4" required placeholder="Jelaskan kebutuhan Anda..."></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary w-100">Kirim Pesan Sekarang</button>
              </form>
            </BaseCard>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 5rem;
  background: var(--color-bg);
  min-height: 100vh;
}

.page-header {
  padding: 6rem 0 4rem 0;
  margin-bottom: 2rem;
}

.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.page-title {
  font-size: 3.5rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto;
}

.pt-0 { padding-top: 0; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.text-muted { color: var(--color-text-muted); line-height: 1.8; font-size: 1.05rem; }
.w-100 { width: 100%; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem !important;
}

.info-card h4 {
  margin-bottom: 0.25rem;
}

.info-icon {
  font-size: 2.5rem;
}

/* Form Styles */
.form-card {
  padding: 3rem !important;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text-main);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  background: var(--color-bg);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(6, 156, 106, 0.1);
}

.alert-success {
  background: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
