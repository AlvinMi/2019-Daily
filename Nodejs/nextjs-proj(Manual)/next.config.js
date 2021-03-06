// 修改 next 里面的默认配置

const withCSS = require("@zeit/next-css");

const configs = {
  // 编译文件输出
  distDir: "dest",
  // 是否给每个路由生成 Etag： 用于进行缓存验证
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLenghth: 2
  },
  // 在 pages 目录下那种后缀的文件会被认为是页面
  pagesExtensions: ["jsx", "js"],
  // 配置 buildId
  generateBuildId: async () => {
    if (precess.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    // 返回 null 使用默认的 unique id
    return null;
  },

  // 手动修改 Webpack config
  webpack(config, options) {
    return config;
  },

  // webpackDevMiddleware 配置
  webpackDevMiddleware: config => {
    return config;
  },

  // 可以在页面上通过 process.env.customKey 获取 value
  env: {
    customKey: "value"
  },

  // 下面两个通过 'next/config' 来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET
  },
  // 在服务端渲染和客户端渲染都可以获取的配置
  publicRuntimeConfig: {
    staticFolder: "/static"
  }
};

if (typeof require !== undefined) {
  // if require 存在
  require.extensions[".css"] = file => {};
}

module.exports = withCSS({
  /* config options here */
  // destDir: "dest"   // 例如这样设置, 就会在项目生成 dest 目录, 和 .next 里面的文件一样。
});
