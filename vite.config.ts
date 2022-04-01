import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // eslint-disable-next-line consistent-return
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: '@arco-design/web-vue',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         // css
    //         return `@arco-design/web-vue/es/${name}/style/css.js`
    //       }
    //     }
    //   ]
    // }),
    WindiCSS()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    host: '0.0.0.0', // 启动ip
    // open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:9110',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
})
