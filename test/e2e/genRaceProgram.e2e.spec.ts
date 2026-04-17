import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from '../helpers/testDataSelectors'

describe('Generate Race Program', async () => {
  await setup()
  const page = await createPage()

  it('should go to race programs list, and check if list is empty', async () => {
    await page.goto(url('/'))
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))
    await expect(page.getByTestId(td.noProgramTxt)).toBeVisible()
  })

  it('should test generating first race program', async () => {
    // check if page is at correct route
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))

    // check generate functionality
    await page.getByTestId(td.genRaceProgramBtn).click()
    await expect(page.getByTestId(td.raceProgramList)).toBeVisible()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(1)
    await expect(page.getByTestId(td.noProgramTxt)).not.toBeVisible()
  })

  it('should test generating more race programs', async () => {
    // check if page is at correct route
    await page.getByTestId(td.raceProgramLink).click()
    await expect(page).toHaveURL(url('/programs'))

    // check generate functionality
    await page.getByTestId(td.genRaceProgramBtn).click()
    // dou to prev test now it should have 2 items
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(2)

    // check for 3rd race program gen
    await page.getByTestId(td.genRaceProgramBtn).click()
    await expect(page.getByTestId(td.raceProgramItem)).toHaveCount(3)
  })
})
