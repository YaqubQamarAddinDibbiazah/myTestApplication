import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage{

    searchbar : Locator
    searchButton : Locator
    constructor(page: Page){
        super(page)
        this.endpoint = 'products'
        this.url = `https://automationexercise.com/${this.endpoint}`

        this.searchbar = this.page.getByRole('textbox', {name : "Search Product"})
        this.searchButton = this.page.locator('#submit_search')
    }

    async openProductPage(productName : string){
        let targetProduct = this.page.locator('.product-image-wrapper').filter({hasText: productName}).getByText('View Product')
        await targetProduct.click() 
    }

    async continueShopping(){
        await this.page.locator('.modal-content').getByRole('button', {name : 'Continue shopping'}).click()
        await this.toProductsPage()
    }

    async addSingeCopyToCart(productName : string){
        let targetProductCard = this.page.locator('.single-products').filter({hasText: productName}).first()
        await targetProductCard.hover()
        await targetProductCard.locator('.product-overlay .add-to-cart').click()

    }

    async addSeveralProducts(...args :  [string, number][] ){
        // [['hat', 1],['shorts', 1],['coat', 1]]
        for (let i = 0; i < args.length; i += 2){

            
            let productName: string = args[i][0]
            let quantity: number = args[i+1][1]

        await this.page.locator('.product-image-wrapper', {hasText : productName}).getByText('View Product').click()
        await this.page.locator('#quantity').clear()
        await this.page.locator('#quantity').fill(quantity.toString())
        await this.page.locator('.btn-default').getByText('Add to cart').click()
        await this.page.locator('.shop-menu').getByText('Products').click()

    
  }
}



}