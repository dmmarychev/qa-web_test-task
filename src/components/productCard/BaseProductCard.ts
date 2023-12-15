import { Page, Locator } from "playwright-core";

class BaseProductCard {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get productCardContainer() {
        return this.page.locator('.note-item');
    }

    get fullPriceProductCardContainer() {
        return this.productCardContainer.filter({ has: this.page.locator('.wrap-ribbon.d-none') });
    }

    get discountedProductCardContainer() {
        return this.productCardContainer.filter({ hasNot: this.page.locator('.wrap-ribbon.d-none') });
    }

    get productType() {
        return this.page.locator('.product_type');
    }

    get productName() {
        return this.page.locator('.product_name');
    }

    get productPrice() {
        return this.page.locator('.product_price');
    }

    get buyButton() {
        return this.page.locator('.actionBuyProduct');
    }


    clickBuyProductButton = (productContainer: Locator) =>
        productContainer.locator(this.buyButton).click();

    getProductType = (productContainer: Locator) =>
        productContainer.locator(this.productType).textContent();

    getProductName = (productContainer: Locator) =>
        productContainer.locator(this.productName).textContent();

    getProductResultPrice = async (productContainer: Locator) => {
        const rawPrice = await productContainer.locator(this.productPrice).textContent() ?? "";
        const resultPrice = rawPrice.substring(0, rawPrice.indexOf(' '));

        return resultPrice;
    }

}

export { BaseProductCard }