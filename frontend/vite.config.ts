import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/shared/assets"),
      "@cmp": path.resolve(__dirname, "./src/shared/cmp"),
      "@stores": path.resolve(__dirname, "./src/shared/stores"),
      "@use": path.resolve(__dirname, "./src/shared/use"),
    },
  },
});
