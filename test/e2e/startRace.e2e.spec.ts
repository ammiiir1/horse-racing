import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'

describe('Start A Race From Programs List', async () => {
  await setup()

  it('should do generate a program and run it', async () => {
    const page = await createPage()
    await page.goto(url('/'))
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))

    // generate a program and click on its start brn
    await page.getByTestId(td.genRaceProgramBtn).click()
    const raceProgramItem = page.getByTestId(td.raceProgramItem).first()
    await raceProgramItem.click()
    await raceProgramItem.getByTestId(td.startRaceBtn).click()
    await expect(page).toHaveURL(/\/programs\/race\?pid=/)

    await expect(page.getByTestId(td.raceTrack)).toBeVisible()
    await expect(page.getByTestId(td.raceResults)).toBeVisible()
    await expect(page.getByTestId(td.raceTrackLane)).toHaveCount(10)
    await expect(page.getByTestId(td.raceResultTable)).toHaveCount(6)
  })
})
