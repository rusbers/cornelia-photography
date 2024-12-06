// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: { contentLayer: true },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // components
      },
    }),
  ],

  adapter: netlify(),
});
