<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'

const reportsList = ref([
  { id: 1, title: 'Laporan Pertanggungjawaban RAT Tahun Buku 2025', year: '2025', status: 'Disetujui RAT', downloadUrl: '#' },
  { id: 2, title: 'Laporan Keuangan & Audit Neraca Semester II', year: '2025', status: 'Terverifikasi Akuntan', downloadUrl: '#' },
  { id: 3, title: 'Laporan Distribusi SHU & Partisipasi Anggota', year: '2025', status: 'Selesai Dicairkan', downloadUrl: '#' }
])

onMounted(() => {
  try {
    const cached = localStorage.getItem('kmlc_reports_cache')
    if (cached) reportsList.value = JSON.parse(cached)
  } catch (e) {}

  fetch('/api/content?section=reports')
    .then(r => r.json())
    .then(res => {
      if (res.success && res.data && res.data.length > 0) {
        reportsList.value = res.data
        try { localStorage.setItem('kmlc_reports_cache', JSON.stringify(reportsList.value)) } catch (e) {}
      }
    })
    .catch(() => {})
})
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Transparansi Koperasi</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Laporan Kinerja & Keuangan</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Komitmen kami terhadap akuntabilitas publik melalui publikasi Rapat Anggota Tahunan (RAT) dan Sisa Hasil Usaha (SHU).
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        
        <div class="report-grid">
          <!-- SHU Growth -->
          <BaseCard class="report-card animate-fade-up">
            <div class="report-header">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <h3>Distribusi SHU 2025</h3>
            </div>
            <p class="text-muted mb-4">
              Pembagian Sisa Hasil Usaha berdasarkan rasio partisipasi modal dan partisipasi usaha anggota Koperasi KMLC.
            </p>
            <div class="table-responsive">
              <table class="corporate-table">
                <thead>
                  <tr>
                    <th>Alokasi Dana</th>
                    <th class="text-right">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cadangan Koperasi</td>
                    <td class="text-right">25%</td>
                  </tr>
                  <tr>
                    <td>Anggota (Proporsional Transaksi)</td>
                    <td class="text-right">40%</td>
                  </tr>
                  <tr>
                    <td>Anggota (Proporsional Simpanan)</td>
                    <td class="text-right">20%</td>
                  </tr>
                  <tr>
                    <td>Dana Sosial & CSR Lingkungan</td>
                    <td class="text-right">10%</td>
                  </tr>
                  <tr>
                    <td>Dana Pendidikan Pengurus</td>
                    <td class="text-right">5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BaseCard>

          <!-- Annual Performance -->
          <BaseCard class="report-card animate-fade-up" style="animation-delay: 0.2s">
            <div class="report-header">
              <svg class="svg-icon" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <h3>Indikator Kinerja Operasional</h3>
            </div>
            <p class="text-muted mb-4">
              Ringkasan metrik pertumbuhan operasional agrikultur pada periode fiskal berjalan dibandingkan tahun sebelumnya.
            </p>
            <div class="metrics-grid">
              <div class="metric-item">
                <span class="metric-label">Total Aset (YtD)</span>
                <span class="metric-value positive">IDR 4.2 Miliar &uarr;</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Volume Kredit KTH</span>
                <span class="metric-value positive">IDR 1.8 Miliar &uarr;</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">NPL (Kredit Macet)</span>
                <span class="metric-value stable">0.85% &rarr;</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Produksi Jagung</span>
                <span class="metric-value positive">1,540 Ton &uarr;</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="download-section-wrapper mt-5 animate-fade-up" style="animation-delay: 0.3s">
          <div class="mb-4">
            <h2>Dokumen Publikasi RAT & Laporan Keuangan</h2>
            <p class="text-muted">Unduh laporan audit independen dan prospektus keuangan tahunan yang telah diverifikasi.</p>
          </div>
          <div class="reports-stack" style="display: flex; flex-direction: column; gap: 1rem;">
            <div v-for="rep in reportsList" :key="rep.id" class="download-section" style="margin: 0;">
              <div class="download-content">
                <h3>{{ rep.title }}</h3>
                <p class="text-muted">Tahun Buku: {{ rep.year }} • Status: <strong>{{ rep.status }}</strong></p>
              </div>
              <a :href="rep.downloadUrl || '#'" target="_blank" class="btn btn-primary">
                <svg class="svg-icon" style="width: 18px; height: 18px;" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Unduh Berkas (PDF)
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 5rem;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.page-header {
  padding: 5rem 0 3rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  background: white;
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

.pt-0 { padding-top: 2rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mt-5 { margin-top: 3rem; }
.text-muted { color: var(--color-text-muted); line-height: 1.6; font-size: 0.95rem; }

.report-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.report-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.svg-icon {
  width: 24px;
  height: 24px;
  stroke: var(--color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.report-header h3 {
  font-size: 1.25rem;
}

/* Table Styles */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.corporate-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.corporate-table th {
  text-align: left;
  padding: 0.75rem 0;
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-text-main);
  font-weight: 700;
}

.corporate-table td {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.text-right {
  text-align: right !important;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  padding: 1.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.metric-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-main);
}

.metric-value.positive { color: var(--color-primary); }
.metric-value.stable { color: #64748B; }

/* Download Section */
.download-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 2rem 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.download-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

@media (max-width: 992px) {
  .report-grid {
    grid-template-columns: 1fr;
  }
  .download-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .page-title { font-size: 1.85rem; }
  .page-header { padding: 2.25rem 0; margin-bottom: 1.5rem; }
  .metrics-grid { grid-template-columns: 1fr; gap: 0.85rem; }
  .report-card { padding: 1.25rem !important; }
  .download-section { padding: 1.25rem; text-align: left; align-items: flex-start; }
  .download-content h3 { font-size: 1.1rem; }
  .metric-value { font-size: 1.1rem; }
}

@media (max-width: 480px) {
  .page-title { font-size: 1.5rem; line-height: 1.3; }
  .page-header { padding: 1.75rem 0; margin-bottom: 1rem; }
  .page-subtitle { font-size: 0.85rem; line-height: 1.5; }
  .report-header h3 { font-size: 1.15rem; }
  .report-card { padding: 1rem !important; border-radius: 8px; }
  .corporate-table th, .corporate-table td { padding: 0.5rem 0.65rem; font-size: 0.8rem; }
  .metrics-grid { gap: 0.65rem; }
  .metric-item { padding: 0.65rem 0.85rem; border-radius: 4px; }
  .metric-label { font-size: 0.72rem; }
  .metric-value { font-size: 0.98rem; }
  .download-section { padding: 1rem; gap: 0.85rem; border-radius: 8px; }
  .download-content h3 { font-size: 1rem; }
  .download-content p { font-size: 0.82rem; line-height: 1.5; }
  .download-section .btn { width: 100%; }
}
</style>
