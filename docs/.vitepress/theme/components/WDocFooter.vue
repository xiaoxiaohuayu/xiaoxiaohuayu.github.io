<template>
  <div class="VPFooter weiz-doc-footer">
    <p class="site">
      <a target="_blank" href="https://vitepress.dev/" title="本站框架基于 VitePress_v1.5.0">
        <img alt="VitePress" src="https://img.shields.io/badge/Frame-VitePress-5C73E7?logo=vitepress&amp;logoColor=fff" />
      </a>
      <a target="_blank" href="https://www.algolia.com/" title="本站搜索服务使用 Algolia">
        <img alt="Algolia" src="https://img.shields.io/badge/Search-Algolia-003DFF?logo=Algolia" />
      </a>
      <a target="_blank" href="https://github.com/" title="本站项目由 Github 托管">
        <img alt="Github" src="https://img.shields.io/badge/Website-Github-C92BCE?logo=GitHub" />
      </a>
      <a target="_blank" href="https://cloud.tencent.com/" title="本站域名管理使用 腾讯云域名服务">
        <img alt="Tencent" src="https://img.shields.io/badge/Domain-Tencent-0099F7?logo=googlecloud&amp;logoColor=fff" />
      </a>
      <a target="_blank"
         href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
         title="本站内容采用 CC BY-NC-SA 4.0 国际许可协议进行许可">
         <img alt="Copyright" src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?logo=coursera&amp;logoColor=fff" />
      </a>
    </p>
    <p class="copyright">
      {{ `Copyright © 2022${new Date().getFullYear() === 2022 ? '' : '-' + new Date().getFullYear()} weizwz` }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.weiz-doc-footer {
  padding: 24px 0;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  z-index: var(--weiz-index-footer);

  .site {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-weight: 500;

    >a {
      display: flex;
      align-items: center;
      margin: 8px 4px 0;
      height: 20px;
    }
  }

  .copyright {
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
}
</style>
