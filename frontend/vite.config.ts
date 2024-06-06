// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env
//   }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Initialize dotenv
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  define: {
    'process.env': process.env,
  },
});