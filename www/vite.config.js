import { defineConfig } from "vite";
export default defineConfig({
    root: "www",
    base: "http://localhost:5173/lab154377/project/",
    build: {
        outDir: "../project",
        emptyOutDir: true,
    },
});