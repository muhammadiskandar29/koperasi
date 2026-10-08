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
        <div class="badge-sub animate-fade-up">Layanan Dukungan</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Pusat Informasi</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Divisi kemitraan dan pelayanan KMLC siap membantu kebutuhan operasional agrikultur Anda.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="contact-grid">
          
          <!-- Contact Info -->
          <div class="contact-info animate-fade-up">
            <h2 class="mb-4">Informasi Institusi</h2>
            <p class="text-muted mb-5">
              Kantor sekretariat operasional berpusat di wilayah Cikawung guna memastikan aksesibilitas yang optimal bagi seluruh mitra binaan kami.
            </p>

            <div class="info-blocks">
              <BaseCard class="info-card">
                <svg class="svg-icon info-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <h4>Alamat Sekretariat</h4>
                  <p class="text-muted">Desa Cikawung, Kec. Terisi,<br>Kab. Indramayu, Jawa Barat 45262</p>
                </div>
              </BaseCard>

              <BaseCard class="info-card">
                <svg class="svg-icon info-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <h4>Kontak Telepon</h4>
                  <p class="text-muted">Hunting: (0234) 567890<br>Direct: 0812-3456-7890</p>
                </div>
              </BaseCard>

              <BaseCard class="info-card">
                <svg class="svg-icon info-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div>
                  <h4>Surel Elektronik</h4>
                  <p class="text-muted">korespondensi@kmlc.co.id<br>kemitraan@kmlc.co.id</p>
                </div>
              </BaseCard>
            </div>
          </div>

          <!-- Interactive Form -->
          <div class="form-wrapper animate-fade-up" style="animation-delay: 0.2s">
            <BaseCard class="form-card">
              <h3 class="mb-4">Formulir Komunikasi</h3>
              
              <transition name="fade">
                <div v-if="isSubmitted" class="alert-success">
                  Data telah tersubmit ke dalam sistem. Staf KMLC akan merespon selambatnya 1x24 jam operasional.
                </div>
              </transition>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-group">
                  <label for="name">Nama Identitas Lengkap</label>
                  <input type="text" id="name" v-model="formData.name" required placeholder="Sesuai KTP / Nama Instansi" />
                </div>
                
                <div class="form-group">
                  <label for="phone">Nomor Kontak (WhatsApp)</label>
                  <input type="tel" id="phone" v-model="formData.phone" required placeholder="0812-XXXX-XXXX" />
                </div>
                
                <div class="form-group">
                  <label for="topic">Kategori Keperluan</label>
                  <select id="topic" v-model="formData.topic">
                    <option value="kemitraan">Kemitraan Lahan</option>
                    <option value="pembiayaan">Pengajuan Saprotan</option>
                    <option value="anggota">Registrasi KTH</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message">Rincian Informasi</label>
                  <textarea id="message" v-model="formData.message" rows="4" required placeholder="Sampaikan detail informasi..."></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary w-100">Kirim Transmisi</button>
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
  padding: 5rem 0 3rem 0;
  background: white;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4rem;
}

.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto;
}

.pt-0 { padding-top: 0; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.text-muted { color: var(--color-text-muted); line-height: 1.7; font-size: 0.95rem; }
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
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem !important;
}

.info-card h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.info-icon {
  width: 28px;
  height: 28px;
  stroke: var(--color-primary);
  flex-shrink: 0;
}

/* Form Styles */
.form-card {
  padding: 2.5rem !important;
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
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.875rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 0.95rem;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.1);
}

.alert-success {
  background: #ECFDF5;
  color: var(--color-primary-dark);
  border: 1px solid #A7F3D0;
  padding: 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title { font-size: 2.25rem; }
  .page-header { padding: 3rem 0; margin-bottom: 2rem; }
  .contact-grid { gap: 2rem; }
  .form-card { padding: 1.5rem !important; }
  .info-card { padding: 1.25rem !important; flex-direction: column; align-items: flex-start; gap: 1rem; }
}
</style>
