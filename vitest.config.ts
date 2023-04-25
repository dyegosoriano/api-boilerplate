import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { configDefaults, defineConfig } from 'vitest/config'

const resolvePath = (p: string) => path.resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@modules': resolvePath('/src/modules/'),
  '@shared': resolvePath('/src/shared/'),
  '@infra': resolvePath('/src/infra/'),
  '@core': resolvePath('/src/core/')
}

export default defineConfig({
  test: {
    include: ['./src/modules/**/useCases/**/*.spec.ts', './src/shared/utils/**/*.spec.ts'],
    exclude: [...configDefaults.exclude, '/dist/*'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'c8'
    },
    globals: true
  },
  resolve: { alias }
})
