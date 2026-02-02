import { test as base, request} from '@playwright/test'
import { PageManager } from "./pages/PageManager"
import user from '../typescriptproject/.auth/user.json'
import fs, { access } from 'fs'

// type MyFixture = {
//     pageManager : PageManager
// }
const Authfile = '.auth/user.json'
export const test = base.extend<{pageManager : PageManager, authPage : PageManager, authAPI : PageManager}>({

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

    // authPage: async ({page, baseURL}, use) =>{
    //     const pm = new PageManager(page)
    //     await pm.page.getByRole('link', {name : 'Signup / Login'}).click()
    //     await pm.page.getByRole('textbox', {name : 'Email Address'}).first().fill('jalipa2912@jxbav.com')
    //     await pm.page.getByRole('textbox', {name : 'Password'}).first().fill('@7XbzHJMHYB3pCX')
    //     await pm.page.getByRole('button', {name : 'Login'}).click()
    //     await page.goto(baseURL as string)
    //     await pm.page.context().storageState({path : Authfile})
    //     await use(pm)
    // }

    authAPI: async({request, page}, use) =>{
        const pm = new PageManager(page)
        await request.get('https://automationexercise.com/')
        const { cookies } = await request.storageState()
        const csrf = cookies.find(c => c.name === 'csrftoken')?.value
        if (!csrf) {
            throw new Error('CSRF token not found');
        }
  // console.log(csrf)

    await request.post('https://automationexercise.com/login', {
        headers: {
            Referer: 'https://automationexercise.com/login',
        },
        form :{
            csrfmiddlewaretoken : csrf,
            email : 'jalipa2912@jxbav.com',
            password : '@7XbzHJMHYB3pCX',
        }
    
    })
        await request.storageState({ path: '.auth/user.json' })
        await use(pm)
    }
})

