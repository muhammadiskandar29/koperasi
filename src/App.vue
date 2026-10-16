<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import AppFooter from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="app-wrapper">
    <Navbar v-if="!route.meta.layout && !route.path.startsWith('/admin')" />
    <main :class="['main-content', { 'admin-main': route.meta.layout || route.path.startsWith('/admin') }]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter v-if="!route.meta.layout && !route.path.startsWith('/admin')" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
