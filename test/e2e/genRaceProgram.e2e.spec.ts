import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'
import { RaceFlow } from '../helpers/raceTestFlows'
import { default_viewport as viewport } from '../setup/defaults'

describe('Generate Race Program', async () => {
  await setup()

  it('should check if program list is empty', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    await raceFlow.gotoProgramsPage()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId(td.noProgramTxt)).toBeVisible()
  })

  it('should generate race programs', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    await raceFlow.gotoProgramsPage()

    // //////////////////////// generating first race program
    await raceFlow.generateProgram()
    await expect(page.getByTestId(td.raceProgramList)).toBeVisible()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(1)
    await expect(page.getByTestId(td.noProgramTxt)).not.toBeVisible()

    // //////////////////////// generating second race program
    await raceFlow.generateProgram()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(2)

    // //////////////////////// generating third race program
    await raceFlow.generateProgram()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(3)
  })

  it('should click on program items to expand their details', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    await raceFlow.gotoProgramsPage()

    // //////////////////////// generating first race program
    await raceFlow.generateProgram()
    await raceFlow.generateProgram()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(2)

    // get program items
    const firstRaceProgramItem = page.getByTestId(td.raceProgramItem).nth(0)
    const firstCollapseHeader = firstRaceProgramItem.locator('.el-collapse-item__header')

    const secondRaceProgramItem = page.getByTestId(td.raceProgramItem).nth(1)
    const secondCollapseHeader = secondRaceProgramItem.locator('.el-collapse-item__header')

    // before start, check every thing is collapsed and not visible
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)

    // expand first collapse
    await firstCollapseHeader.click()
    await expect(firstRaceProgramItem).toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)

    // also check btns if first one is visible and the others not
    await expect(firstRaceProgramItem.getByTestId(td.startRaceBtn)).toBeVisible()
    await expect(secondRaceProgramItem.getByTestId(td.startRaceBtn)).not.toBeVisible()

    // collapse first collapse
    await firstCollapseHeader.click()
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).not.toHaveClass(/is-active/)

    // expand second collapse
    await secondCollapseHeader.click()
    await expect(firstRaceProgramItem).not.toHaveClass(/is-active/)
    await expect(secondRaceProgramItem).toHaveClass(/is-active/)
  })

  it('should go to race page', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    await raceFlow.gotoRacePage()
    await expect(page).toHaveURL(/\/programs\/race\?pid=/)
  })

  it('should check if reloading page redirects to homePage with new app states', async () => {
    const page = await createPage(url('/'), { viewport })
    const raceFlow = new RaceFlow(page)

    await raceFlow.gotoRacePage()
    await page.reload()
    await expect(page).toHaveURL(url('/'))

    // check if after reload racePrograms list is empty again
    await raceFlow.gotoProgramsPage()
    await expect(page.getByTestId(td.noProgramTxt)).toBeVisible()
  })
})
