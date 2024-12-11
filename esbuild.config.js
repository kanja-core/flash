require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'es2020',
    outfile: 'dist/index.js',
    external: [
      'chromium-bidi', // Exclude chromium-bidi dependency
      '*.png', // Exclude any .png files
      './loader', // Exclude the dynamically resolved loader module
      'electron', // Exclude Electron-related dependencies
    ],
    treeShaking: true,
  })
  .catch(() => process.exit(1));
