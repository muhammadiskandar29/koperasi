<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
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
            <!-- Institutional Partner 1 -->
            <BaseCard class="partner-card">
              <div class="partner-icon">
                <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h4>Polres Indramayu</h4>
              <p class="text-muted">Mitra strategis dalam pengawasan keamanan lahan, memitigasi konflik agraria, dan edukasi hukum bagi masyarakat petani.</p>
            </BaseCard>

            <!-- Institutional Partner 2 -->
            <BaseCard class="partner-card">
              <div class="partner-icon">
                <svg class="svg-icon" viewBox="0 0 24 24"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="10" r="2"/></svg>
              </div>
              <h4>Perum Perhutani KPH</h4>
              <p class="text-muted">Penyedia konsesi Hak Guna Lahan eks-kawasan hutan untuk dioptimalisasi melalui skema kemitraan kehutanan sosial.</p>
            </BaseCard>

            <!-- Institutional Partner 3 -->
            <BaseCard class="partner-card">
              <div class="partner-icon">
                <svg class="svg-icon" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              </div>
              <h4>Dinas Pertanian</h4>
              <p class="text-muted">Pemberi bimbingan teknis (Bimtek) budidaya jagung hibrida, sertifikasi lahan, serta fasilitator pupuk bersubsidi.</p>
            </BaseCard>

            <!-- Institutional Partner 4 -->
            <BaseCard class="partner-card">
              <div class="partner-icon">
                <svg class="svg-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h4>Bank BUMD (BJB/BRI)</h4>
              <p class="text-muted">Fasilitator inklusi keuangan syariah dan kredit usaha rakyat (KUR) guna ekspansi modal Koperasi.</p>
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
}
</style>
