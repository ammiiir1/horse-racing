import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'

describe('Start A Race From Programs List', async () => {
  await setup({
    nuxtConfig: {
      runtimeConfig: {
        public: {
          gameSpeedMultiplier: 0.1
        }
      }
    }
  })

  it('should do generate a program and run it, stop it, again run it and tries to change route ... ', async () => {
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

    // check all elements
    await expect(page.getByTestId(td.raceTrack)).toBeVisible()
    await expect(page.getByTestId(td.raceResults)).toBeVisible()
    await expect(page.getByTestId(td.raceTrackLane)).toHaveCount(10)
    await expect(page.getByTestId(td.raceResultTable)).toHaveCount(6)
    await expect(page.getByTestId(td.raceActionBar)).toContainText('Ready to go?')

    // capture initial positions for first and last horses
    const horses = page.getByTestId(td.horseVector)
    const firstHorseStart = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseStart = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)

    // start race
    await page.getByTestId(td.startRaceBtn).click()
    await expect(page.getByTestId(td.startRaceBtn)).not.toBeVisible()
    await expect(page.getByTestId(td.stopRaceBtn)).toBeVisible()
    await expect(page.getByTestId(td.raceActionBar)).toContainText('is running ...')

    await page.waitForTimeout(200) // let horses run

    // check if horses have moved
    const firstHorseEnd = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseEnd = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)
    expect(firstHorseEnd).toBeGreaterThan(firstHorseStart)
    expect(lastHorseEnd).toBeGreaterThan(lastHorseStart)

    // check stop button
    await page.getByTestId(td.stopRaceBtn).click()
    await expect(page.locator('.stop-race-alert')).toBeVisible()

    // check cancel alert
    await page.locator('.cancel-stop-alert-btn').click()
    await expect(page.locator('.stop-race-alert')).not.toBeVisible()

    // check confirm alert
    await page.getByTestId(td.stopRaceBtn).click()
    await page.locator('.confirm-stop-alert-btn').click()
    await expect(page.locator('.stop-race-alert')).not.toBeVisible()
    await expect(page.getByTestId(td.stopRaceBtn)).not.toBeVisible()
    await expect(page.getByTestId(td.startRaceBtn)).toBeVisible()
    await expect(page.getByTestId(td.raceActionBar)).toContainText('Ready to go?')

    // start race again, this time trying leave page while race running
    await page.getByTestId(td.startRaceBtn).click()
    await page.getByTestId(td.raceProgramLink).click()

    // if user cancels, page should not leave
    await page.locator('.cancel-stop-alert-btn').click()
    await expect(page).toHaveURL(/\/programs\/race\?pid=/)
    await expect(page.getByTestId(td.stopRaceBtn)).toBeVisible()

    // now if user confirms leave page
    await page.getByTestId(td.raceProgramLink).click()
    await page.locator('.confirm-stop-alert-btn').click()
    await expect(page).toHaveURL(url('/programs'))
  })

  it('should do generate a program and run it until it finishes and goes back to programs list', async () => {
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

    // final gameplay test is here
    await page.getByTestId(td.startRaceBtn).click()
    await page.waitForTimeout(1000) // let horses run
    await expect(page.locator('.finish-race-alert')).toBeVisible({ timeout: 10000 })
    await page.locator('.confirm-finish-alert-btn').click()
    await expect(page).toHaveURL(url('/programs'))

    // now check if program item is marked ad completed
    await expect(raceProgramItem).toContainText('Completed')
  })
})
