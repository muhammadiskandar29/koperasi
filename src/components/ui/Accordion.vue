<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  content: String
})

const isOpen = ref(false)
</script>

<template>
  <div class="accordion-item" :class="{ active: isOpen }">
    <button class="accordion-header" @click="isOpen = !isOpen">
      <span class="title">{{ title }}</span>
      <span class="icon">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <div class="accordion-content" :style="{ maxHeight: isOpen ? '500px' : '0' }">
      <div class="content-inner">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  background: var(--color-surface);
  overflow: hidden;
  transition: all 0.3s ease;
}

.accordion-item.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--color-text-main);
  font-family: inherit;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
}

.icon {
  font-size: 1.5rem;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.accordion-content {
  max-height: 0;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
}

.content-inner {
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}
</style>
