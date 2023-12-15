import { Page } from '@playwright/test';
import { qaAttrSelector } from '../utils/selectors/QaAttrSelector';
import { SignedInUserNavbar } from '../components/navbar/SignedInUserNavbar';

class BasketPage {
    readonly page: Page;
    readonly navbar: SignedInUserNavbar;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new SignedInUserNavbar(page);
    }
}

export { BasketPage }