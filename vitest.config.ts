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
          name: 'unit',
          include: ['./test/unit/**/*.{test,spec}.ts'],
          setupFiles: ['./test/setup/matchers'],
          environment: 'node'
        }
      },
      {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './app'),
            '~': path.resolve(__dirname, './app')
          }
        },
        test: {
          name: 'e2e',
          include: ['./test/e2e/*.{test,spec}.ts'],
          setupFiles: ['./test/setup/matchers'],
          environment: 'node'
        }
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          setupFiles: ['./test/setup/matchers'],
          include: ['./test/components/*.{test,spec}.ts'],
          environment: 'nuxt'
        }
      })
    ]
  }
})
