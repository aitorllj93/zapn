// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import varlockAstroIntegration from '@varlock/astro-integration';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '/zapn',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Merriweather",
      cssVariable: "--font-heading",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Instrument Sans",
      cssVariable: "--font-sans",
    }
  ],
  integrations: [varlockAstroIntegration(), react()]
});
