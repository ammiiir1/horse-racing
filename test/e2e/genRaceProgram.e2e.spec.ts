import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'

describe('Generate Race Program', async () => {
  await setup()

  it('should check all flows one after one', async () => {
    const page = await createPage()
    await page.goto(url('/'))

    // //////////////////////// go to race programs list, and check if list is empty
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId(td.noProgramTxt)).toBeVisible()

    // //////////////////////// test generating first race program
    await page.getByTestId(td.genRaceProgramBtn).click()
    await expect(page.getByTestId(td.raceProgramList)).toBeVisible()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(1)
    await expect(page.getByTestId(td.noProgramTxt)).not.toBeVisible()

    // //////////////////////// test generating more race programs
    await page.getByTestId(td.genRaceProgramBtn).click()
    // dou to last generate check now it should have 2 items
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(2)

    // check for 3rd race program generate
    await page.getByTestId(td.genRaceProgramBtn).click()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(3)

    // //////////////////////// click on program items to expand their details
    // dou to last checks we have 3 program items available
    const firstRaceProgramItem = page.getByTestId(td.raceProgramItem).nth(0)
    const secondRaceProgramItem = page.getByTestId(td.raceProgramItem).nth(1)
    const thirdRaceProgramItem = page.getByTestId(td.raceProgramItem).nth(2)

    // before start, check every thing is collapsed and not visible
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(thirdRaceProgramItem).not.toHaveClass(/is-active/)

    // also check btns if first one is visible and the others not
    await expect(firstRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()
    await expect(secondRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()
    await expect(thirdRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()

    // expand first collapse
    await firstRaceProgramItem.click({ force: true })
    await expect(firstRaceProgramItem).toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(thirdRaceProgramItem).not.toHaveClass(/is-active/)

    // also check btns if first one is visible and the others not
    await expect(firstRaceProgramItem.getByTestId(td.startRaceBtn)).toBeVisible()
    await expect(secondRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()
    await expect(thirdRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()

    // collapse first collapse
    await firstRaceProgramItem.click({ force: true })
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(thirdRaceProgramItem).not.toHaveClass(/is-active/)

    // expand second collapse
    await secondRaceProgramItem.click({ force: true })
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).toHaveClass(/is-active/)
    await expect(thirdRaceProgramItem).not.toHaveClass(/is-active/)

    // expand third collapse
    await thirdRaceProgramItem.click({ force: true })
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).toHaveClass(/is-active/)
    await expect(thirdRaceProgramItem).toHaveClass(/is-active/)

    // //////////////////////// check if reloading page redirects to homePage with new generated horses
    await page.reload()
    await expect(page).toHaveURL(url('/'))

    // //////////////////////// check if after reload racePrograms list is empty again
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId(td.noProgramTxt)).toBeVisible()
  })
})
