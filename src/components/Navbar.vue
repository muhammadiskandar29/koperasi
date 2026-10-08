<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
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
      <router-link to="/" class="logo" @click="closeMenu">
        <span class="logo-text">KML<span class="text-primary">C</span></span>
      </router-link>
      
      <!-- Desktop Nav -->
      <nav class="nav-links desktop-only">
        <router-link to="/" class="nav-link" active-class="active-link">Beranda</router-link>
        <router-link to="/tentang" class="nav-link" active-class="active-link">Profil Korporasi</router-link>
        <router-link to="/program" class="nav-link" active-class="active-link">Layanan Koperasi</router-link>
        <router-link to="/laporan" class="nav-link" active-class="active-link">Laporan Kinerja</router-link>
        <router-link to="/mitra" class="nav-link" active-class="active-link">Kemitraan</router-link>
      </nav>

      <div class="nav-action desktop-only">
        <router-link to="/kontak" class="btn btn-primary nav-btn">Hubungi Kami</router-link>
      </div>

      <!-- Hamburger Button -->
      <button class="hamburger mobile-only" @click="toggleMenu" aria-label="Toggle navigation">
        <svg v-if="!isMobileMenuOpen" class="svg-icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg v-else class="svg-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <nav class="mobile-nav-links">
        <router-link to="/" class="mobile-link" @click="closeMenu" active-class="active-link">Beranda</router-link>
        <router-link to="/tentang" class="mobile-link" @click="closeMenu" active-class="active-link">Profil Korporasi</router-link>
        <router-link to="/program" class="mobile-link" @click="closeMenu" active-class="active-link">Layanan Koperasi</router-link>
        <router-link to="/laporan" class="mobile-link" @click="closeMenu" active-class="active-link">Laporan Kinerja</router-link>
        <router-link to="/mitra" class="mobile-link" @click="closeMenu" active-class="active-link">Kemitraan</router-link>
        <router-link to="/kontak" class="btn btn-primary mt-4" style="text-align: center" @click="closeMenu">Hubungi Kami</router-link>
      </nav>
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

.text-primary { color: var(--color-primary); }

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

.mobile-only { display: none; }
.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--color-text-main);
  z-index: 110;
}
.svg-icon {
  width: 28px;
  height: 28px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-menu.is-open {
  max-height: 500px;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  padding: 1.5rem var(--container-padding);
  gap: 1.25rem;
}

.mobile-link {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text-main);
  text-decoration: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.mobile-link.active-link {
  color: var(--color-primary);
  font-weight: 700;
  border-bottom-color: var(--color-primary);
}

.mt-4 { margin-top: 1rem; }

@media (max-width: 992px) {
  .desktop-only { display: none; }
  .mobile-only { display: block; }
}
</style>
