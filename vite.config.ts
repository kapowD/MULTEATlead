import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
    base: "/",
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
            "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
            "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
            "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
            "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
            "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
        },
    },
    plugins: [react()],
    optimizeDeps: {
        exclude: ["lucide-react"],
    },
})
