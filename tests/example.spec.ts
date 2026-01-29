import {test} from '../fixture'
import {expect, request} from '@playwright/test'

test('registration using UI', async ({pageManager}) =>{
  await pageManager.loginPage.open()
  await pageManager.loginPage.signupFields.name.fill('ouagadougou')
  await pageManager.loginPage.signupFields.email.fill('niggafent1377288@gmail.com')
  await pageManager.loginPage.signupFields.signupButton.click()
  await pageManager.loginPage.fillAllData('negroe')
})

test('API getting some lists', async({request}) => {
  let allProductsResponse = await request.get('https://automationexercise.com/api/productsList')
  let allProductsResponseBody = await allProductsResponse.json()
  console.log(allProductsResponseBody)

  let allBrandsResponse = await request.get('https://automationexercise.com/api/brandsList')
  let allBrandsResponseBody = await allBrandsResponse.json()
  console.log(Object.keys(allBrandsResponseBody.brands[0]))
  console.log(Object.values(allBrandsResponseBody.brands[0]))
})
