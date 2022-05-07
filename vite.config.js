const { resolve } = require('path');
import { defineConfig } from 'vite';
import Zard from './presets/zard';
import { loadEnv } from "vite";
export default ({ mode }) => defineConfig({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          chunkFileNames: 'src/js/[name]-[hash].js',
          entryFileNames: 'src/js/[name]-[hash].js',
        }
      },
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: 'dist',
      // 压缩
      minify: 'esbuild'
    },
    resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
          'comps': resolve(__dirname, 'src/components'),
          'images': resolve(__dirname, 'src/assets/images')
        }
    },
    css: {
        preprocessorOptions: {
          scss: {
            // 关闭编译时 字符编码 报错问题
            charset: false,
            additionalData: '@import "./src/assets/styles/sass/index.scss";'
          }
        }
    },
    // 压缩
    minify: 'esbuild',
    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * Base public path when served in production.
     * @default '/'
     */
    // root: './',
    base: './',
    /**
     * Directory relative from `root` where build output will be placed. If the
     * directory exists, it will be removed before the build.
     * @default 'dist'
     */
    // outDir: `dist.${MODE}`,
    server: {
      host: '0.0.0.0',
      port: 80,
      proxy: {
        "/api": {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL, // 后台接口
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: Zard(),
    define: {
        'process.env': {},
    }
  });
