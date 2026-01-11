import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Dockter 官方社区",
  description: "全能NAS管理工具",
  head: [
    ["link", { rel: "icon", href: "/assets/icons/favicon.png" }],
    ["script", { src: "/medium-zoom.js" }],
  ],
  markdown: {
    // 链接添加 target="_blank" 属性
    externalLinks: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    publicDir: "public",
  },
  themeConfig: {
    siteTitle: " ",
    logo: {
      light: "/logo-light.png",
      dark: "/logo-dark.png",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      {
        text: "Wiki",
        items: [
          // { text: "Symedia", link: "/archive/symedia/Symedia部署流程" },
          {
            text: "Dockter",
            link: "https://wiki.viplee.cc/dockter/newbie/install/#docker-compose",
          },
        ],
      },
      { text: "捐赠", link: "/donate" },
    ],
    outlineTitle: "目录",
    outline: [2, 6],

    //返回顶部文字修改(移动端)
    returnToTopLabel: "返回顶部",
    //手机端深浅模式文字修改
    darkModeSwitchLabel: "主题模式",

    sidebar: {
      "/archive/dockter/": [
        {
          text: "Dockter",
          collapsed: false,
          items: set_sidebar("/archive/dockter"),
        },
      ],
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/shenxianmq/DockterWiki" },
    ],
  },
});
