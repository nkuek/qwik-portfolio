import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { macroPlugin } from "@builder.io/vite-plugin-macro";
import { recmaProvideComponents } from './recma-provide-components';
import glsl from 'vite-plugin-glsl'

export default defineConfig(async ({mode, command}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { visit } = await import('unist-util-visit');
  const {rehypePrettyCode} = await import('rehype-pretty-code')
  return {
    plugins: [
      macroPlugin({ preset: "pandacss" }),
      qwikCity({
        mdxPlugins: {
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
          rehypeAutolinkHeadings: true,
        },
        mdx: {
          providerImportSource: "~/components/mdxProvider",
          recmaPlugins: [recmaProvideComponents],
          rehypePlugins: [
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === 'element' && node?.tagName === 'pre') {
                  const [codeEl] = node.children;
                  if (codeEl.tagName !== 'code') {
                    return;
                  }
                  node.__rawString__ = codeEl.children?.[0].value;
                }
              });
            },
            [rehypePrettyCode, {theme: 'dracula'}],
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === 'element' && node?.tagName === 'figure') {
                  if (!('data-rehype-pretty-code-figure' in node.properties)) {
                    return;
                  }
                  const preElement = node.children.at(-1);
                  if (preElement.tagName !== 'pre') {
                    return;
                  }
                  preElement.properties['__rawString__'] = node.__rawString__;
                }
              });
            }
          ]
        }
      }),
      qwikVite(),
      tsconfigPaths(),
      glsl(),
    ],
    define: {
      'import.meta.env.VITE_VERCEL_ANALYTICS_ID': JSON.stringify(env.VERCEL_ANALYTICS_ID)
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: ['shiki'],
    },
  };
});
