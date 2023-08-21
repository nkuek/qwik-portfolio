import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { macroPlugin } from "@builder.io/vite-plugin-macro";
import rehypePrettyCode from 'rehype-pretty-code'
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({mode, command}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      macroPlugin({ preset: "pandacss" }),
      qwikCity({
        mdx: {
          rehypePlugins: [
            [rehypePrettyCode, {theme: 'dracula'}]
          ]
        }
      }),
      qwikVite(),
      tsconfigPaths(),
      nodePolyfills()
    ],
    define: {
      'import.meta.env.VITE_VERCEL_ANALYTICS_ID': JSON.stringify(env.VERCEL_ANALYTICS_ID)
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
