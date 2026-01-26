import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  endpoint : string
  url : string
  cartTable : Locator
  cartProductColumns : {[key: string]: Locator}


  constructor(page : Page) {
    super(page)
    this.endpoint = 'view_cart'
    this.url = `https://automationexercise.com/${this.endpoint}`

    this.cartTable = this.page.locator('#cart_info_table')
    this.cartProductColumns = {
      image : this.cartTable.locator('.cart_product'),
      description : this.cartTable.locator('.cart_description'),
      price : this.cartTable.locator('.cart_price'),
      quantity : this.cartTable.locator('.cart_quantity'),
      total : this.cartTable.locator('.cart_total'),
      delete : this.cartTable.locator('.cart_delete a')
}
  }

  async checkCart(){

    let priceDisplayed = (await this.cartProductColumns.price.innerText()).slice(4)
    let quantityDisplayed = await this.cartProductColumns.quantity.innerText()
    let totalPriceDisplayed = (await this.cartProductColumns.total.innerText()).slice(4)
            
    let priceValue = +priceDisplayed
    let quantityValue = +quantityDisplayed
    let totalValue = +totalPriceDisplayed

expect(priceValue * quantityValue === totalValue).toBe(true)

    
  }

  async deleteFromCart(productName : string){


    let productToBeDeleted = this.page.locator('tr', {hasText : productName})
      if (await productToBeDeleted.count() === 0){
          return
      } 
      await productToBeDeleted.locator('.cart_quantity_delete').click()
  }

  proceedToCheckout = this.page.getByText('Proceed To Checkout')

}
