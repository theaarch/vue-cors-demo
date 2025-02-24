import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const useProxy = env.VITE_USE_PROXY === "true";

  return {
    base: process.env.NODE_ENV === 'production' ? '/vue-cors-demo/' : '/',

    plugins: [
      vueDevTools(),
      Components({}),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue", "vue-router"],
      }),
      VueRouter({
        extensions: [".vue"],
        routesFolder: "src/views",
      }),
      vue(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: env.VITE_PORT,
      host: true,
      proxy: useProxy
        ? {
            [env.VITE_API_PROXY_PATH]: {
              target: env.VITE_API_URL,
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(new RegExp(`^${env.VITE_API_PROXY_PATH}`), ""),
            },
          }
        : undefined,
    },
  };
});
