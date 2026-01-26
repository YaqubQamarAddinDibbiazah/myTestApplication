import { test as base} from '@playwright/test'
import { PageManager } from "./pages/PageManager"

// type MyFixture = {
//     pageManager : PageManager
// }

export const test = base.extend<{pageManager : PageManager}>({

    page : async({baseURL, page}, use) => {

        await page.goto(baseURL as string)
        await page.getByRole('button', {name : 'Consent'}).click()
        await use(page)

    },

    pageManager: async ({ page }, use) => {
        // console.log(page)
        const pm = new PageManager(page)
        // await pm.page.goto(baseURL)
        // await pm.page.getByRole('button', {name : 'Consent'}).click()
        await use(pm)
    }
})
