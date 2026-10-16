<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'

const partnersList = ref([
  { id: 1, name: 'Polres Indramayu', category: 'Penegakan Hukum', description: 'Mitra strategis dalam pengawasan keamanan lahan, memitigasi konflik agraria, dan edukasi hukum bagi masyarakat petani.' },
  { id: 2, name: 'Perum Perhutani KPH', category: 'Kawasan Hutan', description: 'Penyedia konsesi Hak Guna Lahan eks-kawasan hutan untuk dioptimalisasi melalui skema kemitraan kehutanan sosial.' },
  { id: 3, name: 'Dinas Pertanian', category: 'Pemerintah', description: 'Pemberi bimbingan teknis (Bimtek) budidaya jagung hibrida, sertifikasi lahan, serta fasilitator pupuk bersubsidi.' },
  { id: 4, name: 'Bank BJB Syariah', category: 'Perbankan', description: 'Fasilitator permodalan KUR Klaster Pertanian dengan margin rendah khusus anggota KMLC.' }
])

onMounted(async () => {
  try {
    const res = await fetch('/api/content?section=partners').then(r => r.json())
    if (res.success && res.data && res.data.length > 0) {
      partnersList.value = res.data
    }
  } catch (e) {}
})
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Jejaring Strategis</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Mitra & Rantai Pasok</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Membangun ekosistem kolaboratif antar instansi pemerintah, penegak hukum, lembaga perbankan, dan swasta.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        
        <div class="network-container animate-fade-up">
          <div class="network-text text-center mb-5">
            <h2 class="mb-4">Ekosistem Sinergi KMLC</h2>
            <p class="text-muted mx-auto" style="max-width: 700px;">
              Keberhasilan konversi lahan tidur menjadi pusat agrikultur produktif tidak terlepas dari peran multi-pihak. KMLC menjalankan model kemitraan <i>Pentahelix</i> yang melibatkan unsur birokrasi, aparat penegak hukum, dan sektor keuangan.
            </p>
          </div>

          <div class="partners-grid">
            <BaseCard v-for="p in partnersList" :key="p.id" class="partner-card">
              <div class="partner-icon">
                <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h4>{{ p.name }}</h4>
              <p class="text-muted">{{ p.description }}</p>
            </BaseCard>
          </div>
        </div>

        <hr class="divider my-5" />

        <div class="supply-chain animate-fade-up">
          <h3 class="text-center mb-4">Skema Rantai Pasok (Supply Chain)</h3>
          <div class="chain-process">
            <div class="chain-node">
              <h5>Distributor Saprotan</h5>
              <span class="node-desc">Penyuplai Bibit & Pupuk</span>
            </div>
            <div class="chain-arrow"><svg viewBox="0 0 24 24" class="svg-icon"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            <div class="chain-node active">
              <h5>Koperasi KMLC</h5>
              <span class="node-desc">Manajemen & Pembiayaan</span>
            </div>
            <div class="chain-arrow"><svg viewBox="0 0 24 24" class="svg-icon"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            <div class="chain-node">
              <h5>Kelompok Tani</h5>
              <span class="node-desc">Produksi Jagung</span>
            </div>
            <div class="chain-arrow"><svg viewBox="0 0 24 24" class="svg-icon"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            <div class="chain-node end">
              <h5>Industri Offtaker</h5>
              <span class="node-desc">Pabrik Pakan Ternak</span>
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
.mb-5 { margin-bottom: 3rem; }
.my-5 { margin: 5rem 0; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-muted { color: var(--color-text-muted); line-height: 1.6; font-size: 0.95rem; }

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.partner-card {
  text-align: center;
  padding: 2rem 1.5rem !important;
}

.partner-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.25rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border-radius: 50%;
  border: 1px solid var(--color-border);
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

.partner-card h4 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
}

.divider {
  border: 0;
  height: 1px;
  background: var(--color-border);
}

/* Supply Chain */
.supply-chain {
  background: white;
  padding: 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.chain-process {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
}

.chain-node {
  flex: 1;
  text-align: center;
  padding: 1.5rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  position: relative;
}

.chain-node.active {
  background: var(--color-primary);
  border-color: var(--color-primary-dark);
}

.chain-node.active h5,
.chain-node.active .node-desc {
  color: white;
}

.chain-node.end {
  background: var(--color-text-main);
  border-color: var(--color-text-main);
}
.chain-node.end h5,
.chain-node.end .node-desc {
  color: white;
}

.chain-node h5 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-main);
}

.node-desc {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.chain-arrow {
  padding: 0 1rem;
  color: var(--color-border);
}

.chain-arrow .svg-icon {
  stroke: #CBD5E1;
  width: 32px;
  height: 32px;
}

@media (max-width: 1024px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .chain-process {
    flex-direction: column;
    gap: 1rem;
  }
  .chain-arrow {
    transform: rotate(90deg);
    padding: 0.5rem 0;
  }
  .chain-node {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
  .page-title { font-size: 2.25rem; }
  .page-header { padding: 3rem 0; margin-bottom: 2rem; }
  .partner-card { padding: 1.5rem !important; }
  .supply-chain { padding: 1.5rem; }
  .chain-node { padding: 1.25rem 1rem; }
}
</style>
