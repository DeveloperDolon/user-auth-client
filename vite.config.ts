import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173, 
    cors: {
      origin: [
        /\.user-auth-client\.netlify\.app$/, 
        "http://localhost:5173" 
      ],
      credentials: true
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  preview: {
    port: 4173 
  }
});