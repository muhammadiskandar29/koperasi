<template>
  <div class="card-premium">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-premium {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 2rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  height: 100%;
}

.card-premium:hover {
  box-shadow: var(--shadow-md);
  border-color: #cbd5e1;
}
</style>
