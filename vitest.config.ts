import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './app'),
            '~': path.resolve(__dirname, './app')
          }
        },
        test: {
          name: 'Unit-Test (logic)',
          include: ['./test/unit/stores/*.{test,spec}.ts', './test/unit/lib/*.{test,spec}.ts'],
          setupFiles: ['./test/setup/matchers'],
          environment: 'node'
        }
      },
      await defineVitestProject({
        test: {
          name: 'Unit-Test (Component)',
          setupFiles: ['./test/setup/matchers'],
          include: ['./test/unit/components/*.{test,spec}.ts'],
          environment: 'nuxt'
        }
      }),
      {
        test: {
          name: 'E2E Test',
          setupFiles: ['./test/setup/matchers'],
          include: ['./test/e2e/*.{test,spec}.ts'],
          environment: 'node',
          testTimeout: 60000,
          hookTimeout: 60000
        }
      }
    ]
  }
})
