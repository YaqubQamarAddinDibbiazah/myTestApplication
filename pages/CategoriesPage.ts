import { Page } from "@playwright/test";

export class CategoriesPage {
  page : Page
  constructor(page : Page) {
    this.page = page;
  }

  category(name : string) {
    return this.page.locator(`#${name}`);
  }

  async openCategory(name : string) {
    const category = this.category(name);
    const className = await category.getAttribute('class');
    if (!className?.includes('in')) {
      await this.page.getByText(name).click();
    }
  }

  subCategory(category : string, sub : string) {
    return this.page.locator(`#${category}`).getByText(sub);
  }
}
