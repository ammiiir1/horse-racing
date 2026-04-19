import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'
import { RaceFlow } from '../helpers/raceTestFlows'
import { default_viewport as viewport } from '../setup/defaults'

describe('Start A Race From Programs List', async () => {
  await setup({
    nuxtConfig: {
      runtimeConfig: {
        public: {
          gameSpeedMultiplier: 0.2,
          testMode: true
        }
      }
    }
  })

  it('should check race page to see if all parts are loaded correctly', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // check all elements
    await expect(page.getByTestId(td.raceTrack)).toBeVisible()
    await expect(page.getByTestId(td.raceResults)).toBeVisible()
    await expect(page.getByTestId(td.raceTrackLane)).toHaveCount(10)
    await expect(page.getByTestId(td.raceResultTable)).toHaveCount(6)
    await expect(page.getByTestId(td.raceActionBar)).toContainText('Ready to go?')
  })

  it('should start a race and check if horses move', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // capture initial positions for first and last horses
    const horses = page.getByTestId(td.horseVector)
    const firstHorseStart = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseStart = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)

    // start race
    await raceFlow.clickStartRaceBtn()
    await expect(page.getByTestId(td.startRaceBtn)).not.toBeVisible()
    await expect(page.getByTestId(td.stopRaceBtn)).toBeVisible()
    await expect(page.getByTestId(td.raceActionBar)).toContainText('is running ...')

    await page.waitForTimeout(100) // let horses run

    // check if horses have moved
    const firstHorseEnd = await horses.first().evaluate((el) => parseFloat(el.style.left) || 0)
    const lastHorseEnd = await horses.last().evaluate((el) => parseFloat(el.style.left) || 0)
    expect(firstHorseEnd).toBeGreaterThan(firstHorseStart)
    expect(lastHorseEnd).toBeGreaterThan(lastHorseStart)
  })

  it('should start a race, try to stop it, reject the confirmation alert (so race should continue)', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // start race
    await raceFlow.clickStartRaceBtn()

    // check stop button
    await raceFlow.clickStopRaceBtn()
    await expect(page.locator('.stop-race-alert')).toBeVisible()

    // check cancel alert
    await page.locator('.cancel-stop-alert-btn').click()
    await expect(page.locator('.stop-race-alert')).toBeHidden()

    // check if race is still running
    await expect(page.getByTestId(td.stopRaceBtn)).toBeVisible()
  })

  it('should start a race, try to stop it, confirm the confirmation alert and finish race', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // start race
    await raceFlow.clickStartRaceBtn()

    // check stop button
    await raceFlow.clickStopRaceBtn()
    await expect(page.locator('.stop-race-alert')).toBeVisible()

    // check confirm cancel alert
    await expect(page.locator('.confirm-stop-alert-btn')).toBeVisible()
    await page.locator('.confirm-stop-alert-btn').click()
    await expect(page.locator('.stop-race-alert')).not.toBeVisible()

    // check if race has stopped
    await expect(page.getByTestId(td.stopRaceBtn)).not.toBeVisible()
    await expect(page.getByTestId(td.startRaceBtn)).toBeVisible()
    await expect(page.getByTestId(td.raceActionBar)).toContainText('Ready to go?')
  })

  it('should start a race, try to leave page (change navigation), game should popup a confirmation to stop, if user cancels page should not leave', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // start race
    await raceFlow.clickStartRaceBtn()
    await page.getByTestId(td.raceProgramLink).click()

    // if user cancels, page should not leave
    await expect(page.locator('.cancel-stop-alert-btn')).toBeVisible()
    await page.locator('.cancel-stop-alert-btn').click()
    await expect(page).toHaveURL(/\/programs\/race\?pid=/)
    await expect(page.getByTestId(td.stopRaceBtn)).toBeVisible()
  })

  it('should start a race, try to leave page (change navigation), game should popup a confirmation to stop, if user confirms page should game should stop and page should change', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // start race
    await raceFlow.clickStartRaceBtn()
    await page.getByTestId(td.raceProgramLink).click()

    // if user confirms, page should leave
    await expect(page.locator('.confirm-stop-alert-btn')).toBeVisible()
    await page.locator('.confirm-stop-alert-btn').click()
    await expect(page).toHaveURL(url('/programs'))
  })

  it('should start a race and wait it until it finishes and goes back to programs list', async () => {
    const page = await createPage(url('/'), { viewport })

    // use RaceFlow helpers
    const raceFlow = new RaceFlow(page)
    await raceFlow.gotoRacePage()

    // start race
    await raceFlow.clickStartRaceBtn()

    await page.waitForTimeout(2000) // let horses run
    await expect(page.locator('.finish-race-alert')).toBeVisible()
    await page.locator('.confirm-finish-alert-btn').click()
    await expect(page).toHaveURL(url('/programs'))

    // now check if program item is marked ad completed
    await expect(page.getByTestId(td.raceProgramItem)).toContainText('Completed')
  })
})
