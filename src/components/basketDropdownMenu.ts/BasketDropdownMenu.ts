import { Page } from '@playwright/test';
import { BasketPage } from '../../pages/BasketPage';

class BasketDropdownMenu {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get menuContainer() {
        return this.page.locator('[aria-labelledby="dropdownBasket"]');
    }

    get basketItemContainer() {
        return this.page.locator('.basket-item.list-group-item');
    }

    get basketItemTitle() {
        return this.page.locator('.basket-item-title');
    }

    get basketItemPrice() {
        return this.page.locator('.basket-item-price');
    }

    get totalBasketPrice() {
        return this.page.locator('.basket_price');
    }

    get goToBasketPageButton() {
        return this.page.locator('[href="/basket"]');
    }

    get clearBasketButton() {
        return this.page.locator('.btn.btn-danger');
    }

    clickGoToBasketPageButton = async () => {
        await this.goToBasketPageButton.click();

        return new BasketPage(this.page);
    }

    clickClearBasketButton = () =>
        this.clearBasketButton.click();


}

export { BasketDropdownMenu }