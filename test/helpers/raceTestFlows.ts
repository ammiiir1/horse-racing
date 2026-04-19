import { url } from '@nuxt/test-utils/e2e'
import type { Page } from '@playwright/test'
import { TEST_DATA_SELECTORS as td } from './testDataSelectors'

export class RaceFlow {
  constructor(public page: Page) {}

  async gotoProgramsPage() {
    await this.page.getByTestId(td.raceProgramLink).click()
    await this.page.waitForURL(url('/programs'))
  }

  async generateProgram() {
    await this.page.getByTestId(td.genRaceProgramBtn).click()
  }

  async gotoRacePage() {
    await this.gotoProgramsPage()
    await this.generateProgram()
    const raceProgramItem = this.page.getByTestId(td.raceProgramItem)
    await raceProgramItem.click({ force: true })
    await raceProgramItem.getByTestId(td.startRaceBtn).click()
    await this.page.waitForURL(/\/programs\/race\?pid=/)
  }
}
