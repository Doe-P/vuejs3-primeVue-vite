import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    vue(),
    Components({
      dirs: ["src/**"],
      /**
       * same too
       *  // dirs:['src/component','src/views']
       */
      extensions: ["vue"],
      deep: true,
      resolvers: [],
      directoryAsNamespace: false,
      globalNamespaces: [],
      directives: true,
      allowOverrides: false,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],

      dts: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "./src/scss/color.scss";
                @import "./src/scss/font.scss";
            `,
      },
    },
  },
});
