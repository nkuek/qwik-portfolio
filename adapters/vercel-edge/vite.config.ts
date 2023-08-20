import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import { builtinModules } from "module";
import path from "path";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      lib: {
        entry: path.resolve(__dirname, 'index.ts'),
        formats: ['es'],
        fileName: () => 'out.js',
      },
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
        external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)]
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
  };
});
