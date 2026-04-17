import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'

describe('HomePage (Horses Statistic)', async () => {
  await setup()
  const page = await createPage()

  it('should load the app and check if horses are generated correctly', async () => {
    await page.goto(url('/'))
    await expect(page.getByTestId('horse-item')).toHaveCount(20)
  })

  it('should test navigation links in header', async () => {
    // test racePrograms link
    await page.getByTestId('race-programs-link').click()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId('generate-program-btn')).toBeVisible()

    // test horsesStatistics link
    await page.getByTestId('horses-statistics-link').click()
    await expect(page).toHaveURL(url('/'))
    await expect(page.getByTestId('horses-statistics-table')).toBeVisible()
  })
})
