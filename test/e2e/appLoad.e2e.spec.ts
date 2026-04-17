import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'

describe('App Load', async () => {
  await setup()
  const page = await createPage()

  it('should load the app and check if horses are generated correctly', async () => {
    await page.goto(url('/'))
    await expect(page.getByTestId(td.horseItem)).toHaveCount(20)
  })

  it('should test navigation links in header', async () => {
    // test racePrograms link
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId(td.genRaceProgramBtn)).toBeVisible()

    // test horsesStatistics link
    await page.getByTestId(td.horseStatisticsLink).click()
    await expect(page).toHaveURL(url('/'))
    await expect(page.getByTestId(td.horseStatisticsTable)).toBeVisible()
  })
})
