<template>
  <div class="card-premium">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-premium {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.card-premium:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}
</style>
