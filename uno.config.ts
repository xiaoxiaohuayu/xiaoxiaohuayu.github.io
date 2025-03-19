import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  // 避免与 Element Plus 冲突
  presets: [
    presetUno({
      dark: "class",
    }),
    presetAttributify(),
    presetIcons(),
  ],
  // 自定义规则
  rules: [],
  // 自定义快捷方式
  shortcuts: {},
  // 排除的文件
  exclude: ["node_modules", ".git", "dist"],
});
