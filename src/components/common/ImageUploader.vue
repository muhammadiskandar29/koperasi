<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Gambar'
  },
  hint: {
    type: String,
    default: 'Format yang didukung: JPG, PNG, WEBP (Maksimal 1200px, otomatis dioptimalkan)'
  },
  presetTitle: {
    type: String,
    default: 'Pilih dari gambar yang tersedia:'
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const isDragging = ref(false)
const isProcessing = ref(false)
const showUrlInput = ref(false)

// Galeri gambar bawaan koperasi (Hanya menyimpan path ke file lokal)
const presets = [
  { label: 'Sawah Cikawung', url: '/assets/images/hero.jpg' },
  { label: 'Panen Raya Jagung', url: '/assets/images/harvest.jpg' },
  { label: 'Perataan Lahan', url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg' },
  { label: 'Musyawarah KTH', url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.51.jpeg' },
  { label: 'Survei Irigasi', url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52.jpeg' },
  { label: 'Titik Geotagging', url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (1).jpeg' },
  { label: 'Kebersamaan Tani', url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (2).jpeg' },
  { label: 'Video Land Clearing', url: '/assets/images/WhatsApp Video 2026-10-12 at 08.29.50.mp4' },
  { label: 'Video Terasering', url: '/assets/images/WhatsApp Video 2026-10-12 at 08.29.51.mp4' }
]

const compressionInfo = ref('')

const triggerFilePicker = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// Konversi & kompresi otomatis ke WebP super ringan di browser
const compressAndEmit = (file) => {
  if (!file) return

  isProcessing.value = true
  compressionInfo.value = ''
  const reader = new FileReader()

  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        const maxDimension = 1000 // Dimensi optimal web responsif

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Prioritaskan WebP yang jauh lebih ringan daripada PNG/JPG biasa
        let compressedBase64 = canvas.toDataURL('image/webp', 0.75)
        let formatName = 'WebP'

        // Fallback jika browser lawas tidak support WebP
        if (!compressedBase64.startsWith('data:image/webp')) {
          compressedBase64 = canvas.toDataURL('image/jpeg', 0.75)
          formatName = 'JPEG'
        }

        const sizeKb = Math.round((compressedBase64.length * 0.75) / 1024)
        compressionInfo.value = `Terkonversi ke ${formatName} super ringan: ~${sizeKb} KB`
        emit('update:modelValue', compressedBase64)
      } catch (err) {
        emit('update:modelValue', e.target.result)
      } finally {
        isProcessing.value = false
      }
    }
    img.onerror = () => {
      isProcessing.value = false
      alert('Gagal memproses file gambar.')
    }
    img.src = e.target.result
  }

  reader.onerror = () => {
    isProcessing.value = false
    alert('Gagal membaca file gambar.')
  }

  reader.readAsDataURL(file)
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    compressAndEmit(files[0])
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files && files.length > 0) {
    compressAndEmit(files[0])
  }
}

const selectPreset = (url) => {
  compressionInfo.value = 'Menggunakan path file lokal: ' + url
  emit('update:modelValue', url)
}

const removeImage = () => {
  compressionInfo.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="image-uploader">
    <div class="uploader-header">
      <label class="uploader-label">{{ label }}</label>
      <span class="uploader-status" v-if="modelValue">Gambar Terpasang</span>
    </div>
    <p v-if="hint" class="uploader-hint">{{ hint }}</p>
    <div v-if="compressionInfo" class="compression-alert">
      <span class="compression-icon">⚡</span>
      <span>{{ compressionInfo }}</span>
    </div>

    <!-- Hidden native file input -->
    <input 
      ref="fileInput" 
      type="file" 
      accept="image/*" 
      class="hidden-input" 
      @change="handleFileSelect" 
    />

    <!-- Upload Dropzone (When No Image is selected) -->
    <div 
      v-if="!modelValue"
      class="upload-dropzone" 
      :class="{ 'is-dragging': isDragging, 'is-processing': isProcessing }"
      @click="triggerFilePicker"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div v-if="isProcessing" class="processing-state">
        <div class="spinner-small"></div>
        <p class="processing-text">Mengoptimalkan gambar...</p>
      </div>

      <div v-else class="dropzone-content">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="text-group">
          <div class="dropzone-title">Pilih file gambar atau seret ke sini</div>
          <div class="dropzone-sub">PNG, JPG, atau WEBP hingga 1200px</div>
        </div>
        <button type="button" class="btn-browse" @click.stop="triggerFilePicker">
          Pilih File
        </button>
      </div>
    </div>

    <!-- Active Image Preview Card (When Image is selected) -->
    <div v-else class="image-preview-card">
      <div class="preview-img-container">
        <img :src="modelValue" alt="Pratinjau Gambar" class="preview-img" />
      </div>
      <div class="preview-bar">
        <span class="preview-tag">Pratinjau Aktif</span>
        <div class="preview-actions">
          <button type="button" class="btn-secondary-sm" @click="triggerFilePicker">
            Ganti Gambar
          </button>
          <button type="button" class="btn-danger-sm" @click="removeImage">
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Presets Selector -->
    <div class="presets-section">
      <div class="presets-title">{{ presetTitle }}</div>
      <div class="presets-row">
        <button 
          v-for="(p, idx) in presets" 
          :key="idx" 
          type="button" 
          class="preset-item" 
          :class="{ active: modelValue === p.url }"
          @click="selectPreset(p.url)"
        >
          <img :src="p.url" :alt="p.label" class="preset-thumb" />
          <span class="preset-label">{{ p.label }}</span>
        </button>
      </div>
    </div>

    <!-- Optional Manual URL Input -->
    <div class="manual-url-section">
      <button 
        type="button" 
        class="toggle-link" 
        @click="showUrlInput = !showUrlInput"
      >
        {{ showUrlInput ? 'Tutup input URL gambar' : 'Gunakan URL gambar manual' }}
      </button>
      <div v-if="showUrlInput" class="manual-input-box">
        <input 
          :value="modelValue" 
          type="text" 
          class="form-input-sm" 
          placeholder="Contoh: https://... atau /assets/images/hero.jpg" 
          @input="emit('update:modelValue', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-uploader {
  margin-bottom: 1.5rem;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.25rem;
}

.uploader-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.uploader-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.uploader-status {
  font-size: 0.72rem;
  font-weight: 600;
  color: #047857;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.uploader-hint {
  font-size: 0.8rem;
  color: #64748B;
  margin: 0 0 0.85rem 0;
}

.hidden-input {
  display: none;
}

/* Upload Dropzone */
.upload-dropzone {
  border: 1.5px dashed #CBD5E1;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 1.75rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.upload-dropzone:hover, .upload-dropzone.is-dragging {
  border-color: #047857;
  background: #F0FDF4;
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon-circle {
  width: 44px;
  height: 44px;
  background: #E2E8F0;
  color: #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.upload-dropzone:hover .icon-circle {
  background: #D1FAE5;
  color: #047857;
}

.dropzone-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1E293B;
}

.dropzone-sub {
  font-size: 0.78rem;
  color: #64748B;
}

.btn-browse {
  margin-top: 0.4rem;
  background: #047857;
  color: #FFFFFF;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-browse:hover {
  background: #065F46;
}

/* Processing Spinner */
.processing-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.spinner-small {
  width: 28px;
  height: 28px;
  border: 2px solid #E2E8F0;
  border-top-color: #047857;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.processing-text {
  font-size: 0.82rem;
  color: #047857;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Image Preview */
.image-preview-card {
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  overflow: hidden;
  background: #F8FAFC;
}

.preview-img-container {
  width: 100%;
  height: 220px;
  background: #0F172A;
  overflow: hidden;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-bar {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #E2E8F0;
  background: #FFFFFF;
}

.preview-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #047857;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-secondary-sm {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  color: #1E293B;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary-sm:hover {
  background: #E2E8F0;
}

.btn-danger-sm {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger-sm:hover {
  background: #FEE2E2;
}

/* Presets */
.presets-section {
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid #F1F5F9;
}

.presets-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 0.5rem;
}

.presets-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.5rem;
}

.preset-item {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.35rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.15s ease;
}

.preset-item:hover {
  border-color: #047857;
}

.preset-item.active {
  border-color: #047857;
  background: #ECFDF5;
  box-shadow: 0 0 0 1.5px #047857;
}

.preset-thumb {
  width: 100%;
  height: 55px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.preset-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: #334155;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

/* Manual URL */
.manual-url-section {
  margin-top: 0.75rem;
}

.toggle-link {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #64748B;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.toggle-link:hover {
  color: #0F172A;
}

.manual-input-box {
  margin-top: 0.4rem;
}

.form-input-sm {
  width: 100%;
  padding: 0.45rem 0.65rem;
  font-size: 0.8rem;
  border: 1px solid #CBD5E1;
  border-radius: 5px;
  box-sizing: border-box;
}

.compression-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.4rem 0.75rem;
  background-color: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #065F46;
  font-weight: 500;
}

.compression-icon {
  font-size: 0.9rem;
}
</style>
