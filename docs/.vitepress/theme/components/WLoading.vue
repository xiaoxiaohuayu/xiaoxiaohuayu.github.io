<template>
  <div class="load">
    <div class="load-main">
      <div class="l-1 loading-text">x</div>
      <div class="l-2 loading-text loading-color2">i</div>
      <div class="l-3 loading-text">a</div>
      <div class="l-4 loading-text loading-color2">o</div>
      <div class="l-5 loading-text loading-color3">.</div>
      <div class="l-6 loading-text">h</div>
      <div class="l-7 loading-text loading-color2">u</div>
      <div class="l-8 loading-text loading-color3">a</div>
      <div class="l-9 loading-text">y</div>
      <div class="l-10 loading-text loading-color2">.</div>
      <div class="l-11 loading-text loading-color3">.</div>
      <div class="l-12 loading-text">.</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  .load-main {
    display: flex;
  }
  .loading-text {
    letter-spacing: 1px;
    font-weight: 800;
    font-family: "Chalkboard", "Arial", -apple-system, BlinkMacSystemFont,
      "Helvetica Neue", Helvetica, sans-serif;
    color: var(--weiz-primary-color);
    animation-name: loading;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-direction: linear;
    &.loading-color2 {
      color: #24e5c7;
    }
    &.loading-color3 {
      color: #ff8446;
    }
  }

  .l-1 {
    animation-delay: 0s;
  }
  .l-2 {
    animation-delay: 0.0233s;
  }
  .l-3 {
    animation-delay: 0.0872s;
  }
  .l-4 {
    animation-delay: 0.1826s;
  }
  .l-5 {
    animation-delay: 0.3005s;
  }
  .l-6 {
    animation-delay: 0.432s;
  }
  .l-7 {
    animation-delay: 0.568s;
  }
  .l-8 {
    animation-delay: 0.6995s;
  }
  .l-9 {
    animation-delay: 0.8174s;
  }
  .l-10 {
    animation-delay: 0.9128s;
  }
  .l-11 {
    animation-delay: 0.9767s;
  }
  .l-12 {
    animation-delay: 1s;
  }
}

@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
