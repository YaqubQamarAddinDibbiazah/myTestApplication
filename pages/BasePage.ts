import { Page, Locator } from "@playwright/test";

export class BasePage {
    page : Page
    endpoint : string
    url : string
    navigationMenu : Locator
    navigationMenuButtons : {[key : string]: Locator}
    categoriesPannel : Locator
    categories : {[key : string]: Locator}
    brandsPannel : Locator
    brandsList : {[key : string]: Locator}
    emailSubscriptionBlock : Locator
    emailSubscriptionFields : {[key : string]: Locator}

  constructor(page : Page) {
    this.page = page;
    this.endpoint = ''
    this.url = `https://automationexercise.com/${this.endpoint}`
    this.navigationMenu = this.page.locator('.header-middle')
    this.navigationMenuButtons = {
        home : this.navigationMenu.getByText('Home'),
        products : this.navigationMenu.getByText('Products'),
        cart : this.navigationMenu.getByText('Cart'),
        login : this.navigationMenu.getByText('Signup / Login'),
        testCases : this.navigationMenu.getByText('Test Cases'),
        apiPage : this.navigationMenu.getByText('API Testing'),
        youTubePage : this.navigationMenu.getByText('Video Tutorials'),
        contactUsPage : this.navigationMenu.getByText('Contact us'),
        logout : this.navigationMenu.getByText('Logout'),
    }
    this.categoriesPannel = this.page.locator('#accordian')
    this.categories = {
        men : this.categoriesPannel.getByRole('link', {name : 'MEN'}),
        women : this.categoriesPannel.locator('.category-products .panel-title :text-is("Women")'),
        kids : this.categoriesPannel.locator('.category-products .panel-title :text-is("Kids")'),
    }
    this.brandsPannel = this.page.locator('.brands_products')
    this.brandsList = {
        polo : this.brandsPannel.getByText('polo'),
        hm : this.brandsPannel.getByText('H&M'),
        madame : this.brandsPannel.getByText('Madame'),
        mastHarbour : this.brandsPannel.getByText('Mast & Harbour'),
        babyhug : this.brandsPannel.getByText('Babyhug'),
        allenSollyJunior : this.brandsPannel.getByText('Allen Solly Junior'),
        kookieKids : this.brandsPannel.getByText('Kookie Kids'),
        biba : this.brandsPannel.getByText('biba'),
    }
    this.emailSubscriptionBlock = this.page.locator('.searchform')
    this.emailSubscriptionFields = {
        email : this.emailSubscriptionBlock.getByRole('textbox', {name : "Your email address"}),
        submit : this.emailSubscriptionBlock.getByRole('button')
    }
  }

  async open() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

    

    async toHomePage(){
        await this.navigationMenuButtons.home.click()
    }
    async toProductsPage(){
        await this.navigationMenuButtons.products.click()
    }
    async toCartPage(){
        await this.navigationMenuButtons.cart.click()
    }
    async toLoginPage(){
        await this.navigationMenuButtons.login.click()
    }
    async toTestCasesPage(){
        await this.navigationMenuButtons.testCases.click()
    }
    async toAPIPage(){
        await this.navigationMenuButtons.apiPage.click()
    }
    async toYouTubePage(){
        await this.navigationMenuButtons.youTubePage.click()
    }
    async toContactUsPage(){
        await this.navigationMenuButtons.contactUsPage.click()
    }


    


    async openSubcategory(categoryName : string, subCategory : string = ''){
        let category = this.page.locator(`#${categoryName}`)
        let className  = await category.getAttribute('class')

        if (className && !className.includes('in')){
            await this.page.locator(`:text-is('${categoryName}')`).click()
        } else{
            throw new Error('className wasn\'t found')
        }
        if(subCategory){
            await this.page.locator(`:text-is('${subCategory}')`).click()
        }
        
    }
}

