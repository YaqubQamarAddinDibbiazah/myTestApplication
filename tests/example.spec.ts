import {test} from '../fixture'
import {expect} from '@playwright/test'

test('registration using UI', async ({pageManager}) =>{
  await pageManager.loginPage.open()
  await pageManager.loginPage.signupFields.name.fill('ouagadougou')
  await pageManager.loginPage.signupFields.email.fill('niggafent1377288@gmail.com')
  await pageManager.loginPage.signupFields.signupButton.click()
  await pageManager.loginPage.fillAllData('negroe')
})


// создать репозиторий на гит хаб (паблик), клонировать его на локал, склонировать его на комп, и запушить код на гит - склонировать == синхронизировать с гитом