import { test as base} from '@playwright/test'
import { PageManager } from "./pages/PageManager"

// type MyFixture = {
//     pageManager : PageManager
// }

export const test = base.extend<{pageManager : PageManager, authPage : PageManager}>({

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
    },

    authPage: async ({page, baseURL}, use) =>{
        const pm = new PageManager(page)
        await pm.page.getByRole('link', {name : 'Signup / Login'}).click()
        await pm.page.getByRole('textbox', {name : 'Email Address'}).first().fill('jalipa2912@jxbav.com')
        await pm.page.getByRole('textbox', {name : 'Password'}).first().fill('@7XbzHJMHYB3pCX')
        await pm.page.getByRole('button', {name : 'Login'}).click()
        await page.goto(baseURL as string)
        await use(pm)
    }
})
