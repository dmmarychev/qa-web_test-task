import { Page } from "playwright-core";
import { BasketDropdownMenu } from "../basketDropdownMenu.ts/BasketDropdownMenu";

class SignedInUserNavbar {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get barndName() {
        return this.page.locator('.navbar-brand');
    }

    get avatar() {
        return this.page.getByTestId('dropdownUser').locator('.user-avatar');
    }

    get username() {
        return this.page.getByTestId('dropdownUser');
    }

    get basketButton() {
        return this.page.getByTestId('dropdownBasket');
    }

    get basketItemsBadge() {
        return this.page.locator('.basket-count-items');
    }


    clickBrandName = () =>
        this.barndName.click();

    clickBasketButton = async () => {
        await this.basketButton.click();

        return new BasketDropdownMenu(this.page);
    }

}

export { SignedInUserNavbar }