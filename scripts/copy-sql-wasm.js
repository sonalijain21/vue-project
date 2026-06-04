import { copyFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

try {
  const src = resolve('node_modules', 'sql.js', 'dist', 'sql-wasm.wasm')
  const outDir = resolve('public')
  const dest = resolve(outDir, 'sql-wasm.wasm')

  mkdirSync(outDir, { recursive: true })
  copyFileSync(src, dest)
  console.log('Copied sql-wasm.wasm to public/')
} catch (err) {
  console.error('Failed to copy sql-wasm.wasm:', err)
  process.exitCode = 1
}
