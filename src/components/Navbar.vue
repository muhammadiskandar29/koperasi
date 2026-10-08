<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled || route.path !== '/' }]">
    <div class="container navbar-container">
      <router-link to="/" class="logo">
        <span class="logo-text">KML<span class="text-primary">C</span></span>
      </router-link>
      
      <nav class="nav-links">
        <router-link to="/" class="nav-link" active-class="active-link">Beranda</router-link>
        <router-link to="/tentang" class="nav-link" active-class="active-link">Profil Korporasi</router-link>
        <router-link to="/program" class="nav-link" active-class="active-link">Layanan Koperasi</router-link>
        <router-link to="/laporan" class="nav-link" active-class="active-link">Laporan Kinerja</router-link>
        <router-link to="/mitra" class="nav-link" active-class="active-link">Kemitraan</router-link>
      </nav>

      <div class="nav-action">
        <router-link to="/kontak" class="btn btn-primary nav-btn">Hubungi Kami</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background-color 0.3s ease, padding 0.3s ease;
  background: white;
  border-bottom: 1px solid transparent;
}

.navbar-scrolled {
  padding: 1rem 0;
  background: white;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-primary-dark);
}

.text-primary {
  color: var(--color-primary);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  font-weight: 500;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav-link:hover, .active-link {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 992px) {
  .nav-links, .nav-action {
    display: none;
  }
}
</style>
