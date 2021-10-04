<template>
  <div>
    <div class="loading-loader-overlay">
      <div class="loading-loader-spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-loader-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
}
.loading-loader-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-right-color: transparent;
  transform-origin: center;
  animation: rotate 1s linear infinite;
}
</style>
