import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the built site use relative asset paths, so it works
// on GitHub Pages no matter what the repository is named.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
