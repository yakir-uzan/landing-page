import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base תואם ל-GitHub Pages של הריפו: https://<user>.github.io/landing-page/
export default defineConfig({
  base: '/landing-page/',
  plugins: [react()],
});
