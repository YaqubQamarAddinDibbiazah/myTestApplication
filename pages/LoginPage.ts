import { Locator, Page } from '@playwright/test'
import {BasePage } from './BasePage'

export class LoginPage extends BasePage{
    loginBlock : Locator
    loginFields : {[key : string] : Locator}
    signupBlock : Locator
    signupFields : {[key : string] : Locator}

    constructor(page: Page){
        super(page)
        this.endpoint = 'login'
        this.url = `https://automationexercise.com/${this.endpoint}`
        this.loginBlock = this.page.locator('.login-form')
        this.loginFields = {
        email : this.loginBlock.getByRole('textbox', {name : 'Email Address'}),
        password : this.loginBlock.getByRole('textbox', {name : 'Password'}),
        loginButton : this.loginBlock.getByRole('button', {name : 'Login'})
}

        this.signupBlock = this.page.locator('.signup-form')
        this.signupFields = {
        name : this.signupBlock.getByRole('textbox', {name : 'Name'}),
        email : this.signupBlock.getByRole('textbox', {name : 'Email Address'}),
        signupButton : this.signupBlock.getByRole('button', {name : 'Signup'})  
    }
    }



    async fillAllData(password : string){
        let allCheckboxes = this.page.getByRole('checkbox')
                
        for (let checkbox of await allCheckboxes.all()){
          await checkbox.check({force : true})
        }
                
        await this.page.locator('#password').fill(password)
        await this.page.locator('#days').selectOption({ value: '11' })
        await this.page.locator('#months').selectOption({ value: '4' })
        await this.page.locator('#years').selectOption({ value: '1999' })
        await this.page.locator('#first_name').fill('Yaqub')
        await this.page.locator('#last_name').fill('Qamar ad-din Dibiazzah')
        await this.page.locator('#address1').fill('123-washington alley')
        await this.page.locator('#country').selectOption({ value: 'United States' })
        await this.page.locator('#state').fill('LA')
        await this.page.locator('#city').fill('Baton Rouge')
        await this.page.locator('#zipcode').fill('1408396')
        await this.page.locator('#mobile_number').fill('2281477')
        await this.page.getByRole('button', { name: 'Create Account' }).click()
        // await this.page.locator('.btn-primary').click()
    }
}