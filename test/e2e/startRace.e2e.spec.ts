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

    // define some elements
    const startBtn = page.getByTestId(td.startRaceBtn)
    const stopBtn = page.getByTestId(td.stopRaceBtn)
    const raceActionBar = page.getByTestId(td.raceActionBar)

    // check all elements
    await expect(page.getByTestId(td.raceTrack)).toBeVisible()
    await expect(page.getByTestId(td.raceResults)).toBeVisible()
    await expect(page.getByTestId(td.raceTrackLane)).toHaveCount(10)
    await expect(page.getByTestId(td.raceResultTable)).toHaveCount(6)
    expect(raceActionBar).toContainText('Ready to go?')

    // capture initial positions for first and last horses
    const horses = page.getByTestId(td.horseVector)
    const firstHorseStart = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseStart = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)

    // start race
    await startBtn.click()
    await expect(startBtn).not.toBeVisible()
    await expect(stopBtn).toBeVisible()
    expect(raceActionBar).toContainText('is running ...')

    await page.waitForTimeout(1000) // let horses run

    // check if horses have moved
    const firstHorseEnd = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseEnd = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)
    expect(firstHorseEnd).toBeGreaterThan(firstHorseStart)
    expect(lastHorseEnd).toBeGreaterThan(lastHorseStart)
  })
})
