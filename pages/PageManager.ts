import { Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import { CartPage } from "./CartPage"
import { CategoriesPage} from "./CategoriesPage"
import { LoginPage } from "./LoginPage"
import { ProductDetailsPage } from "./ProductDetailsPage"
import { ProductsPage } from "./ProductsPage"

export class PageManager{
    page : Page
    basePage: BasePage
    cartPage: CartPage
    categoriesPage: CategoriesPage
    loginPage: LoginPage
    productDetailsPage: ProductDetailsPage
    productsPage: ProductsPage
    
    constructor(page: Page){
        this.page = page
        this.basePage = new BasePage(this.page)
        this.cartPage = new CartPage(this.page)
        this.categoriesPage = new CategoriesPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.productDetailsPage = new ProductDetailsPage(this.page)
        this.productsPage = new ProductsPage(this.page)
    }
}