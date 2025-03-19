<template>
  <div class="pdf-viewer">
    <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";

const { frontmatter } = useData();
const pdfUrl = withBase(frontmatter.value.pdfUrl || "/resume.pdf");
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f5f5f5;
}

.pdf-viewer iframe {
  border: none;
  background: white;
}
</style>
