import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('HomePage (Horses Statistic)', async () => {
  await setup()

  it('should load the app and check if horses are generated correctly', async () => {
    const page = await createPage()
    await page.goto(url('/'))

    const horses = page.locator('[data-testid="horse-item"]')
    await horses.first().waitFor({ state: 'visible' })
    const count = await horses.count()
    expect(count).toBe(20)
  })

  it('should load the app and tests navbar links', async () => {
    const page = await createPage()
    await page.goto(url('/'))

    // test racePrograms link
    await page.getByTestId('race-programs').click()
    await page.waitForURL('**/programs')
    expect(page.url()).toBe(url('/programs'))

    // test horsesStatistics link
    await page.getByTestId('horses-statistics').click()
    await page.waitForURL('**/')
    expect(page.url()).toBe(url('/'))
  })
})
