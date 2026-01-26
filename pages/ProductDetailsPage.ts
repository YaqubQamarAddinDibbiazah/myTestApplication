import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ProductDetailsPage extends BasePage{
  productDescriptionField : Locator
  productDetails : {[key : string] : Locator}
  reviewBlock : Locator
  reviewFields : {[key : string] : Locator}
  constructor(page : Page) {
    super(page)
    this.endpoint = ''
    this.url = `https://automationexercise.com/${this.endpoint}`


  this.productDescriptionField = this.page.locator('.product-information')
  this.productDetails = {
    productQuantityInput : this.productDescriptionField.locator('#quantity'),
    addToCartButton : this.productDescriptionField.getByRole('button', {name : 'Add to cart'})
  }

  this.reviewBlock = this.page.locator('.shop-details-tab')
  this.reviewFields = {
    name : this.reviewBlock.getByRole('textbox', {name : 'Your Name'}),
    emailAddress : this.reviewBlock.getByRole('textbox', {name : 'Email Address'}),
    reviewBody : this.reviewBlock.getByRole('textbox', {name : 'Add Review Here!'}),
    submitReview : this.reviewBlock.getByRole('button', {name : 'Submit'}),
  }
  
  }


}