import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'
import { default_viewport as viewport } from '../setup/defaults'
import { RaceFlow } from '../helpers/raceTestFlows'

describe('App Load', async () => {
  await setup()

  it('should load the app and check if horses are generated correctly', async () => {
    const page = await createPage(url('/'), { viewport })
    await expect(page.getByTestId(td.horseItem)).toHaveCount(20)
  })

  it('should test navigation links in header', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    // test racePrograms link
    await raceFlow.gotoProgramsPage()
    await expect(page.getByTestId(td.genRaceProgramBtn)).toBeVisible()

    // test horsesStatistics link
    await page.getByTestId(td.horseStatisticsLink).click()
    await expect(page).toHaveURL(url('/'))
    await expect(page.getByTestId(td.horseStatisticsTable)).toBeVisible()
  })
})
