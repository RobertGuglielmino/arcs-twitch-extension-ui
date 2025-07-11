import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import zipPack from "vite-plugin-zip-pack";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'twitch-config.json',
          dest: '.'
        }
      ]
    }),
    zipPack({
      outFileName: "dist.zip",
      outDir: ".",
    }),
  ],
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
    cors: true,
  },
  build: {
    rollupOptions: {
      input: {
        viewer: resolve(__dirname, "index.html"),
        // config: resolve(__dirname, "config.html"),
        // video_index: resolve(__dirname, "video_index.html"),
      },
      output: {
        entryFileNames: 'viewer.js',
        assetFileNames: (_) => {
          // if (assetInfo.name.endsWith('.css')) {
          //   return 'style.css';
          // }
          // Ensure all assets go to the assets directory with their full path preserved
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    cssCodeSplit: false,
    cssTarget: "chrome61",
    assetsInlineLimit: 1638400,
    sourcemap: false,
    emptyOutDir: true,
    outDir: "dist",
    manifest: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  assetsInclude: ['**/*.ttf', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp'],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets")
    },
  },
});

