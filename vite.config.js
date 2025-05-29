import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ghPages({
    branch: 'gh-pages',
    dotfiles: true
  })
  ],
  base: 'pocket-pixels',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});