import { Page } from '@playwright/test';
import { qaAttrSelector } from '../utils/selectors/QaAttrSelector';
import { SignedInUserNavbar } from '../components/navbar/SignedInUserNavbar';
import { BaseProductCard } from '../components/productCard/BaseProductCard';

class CatalogPage {
    readonly page: Page;
    readonly navbar: SignedInUserNavbar;
    readonly productCard: BaseProductCard;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new SignedInUserNavbar(page);
        this.productCard = new BaseProductCard(page);
    }

    get showOnlyDiscountedProductsCheckbox() {
        return this.page.getByTestId('gridCheck');
    }

    get pageItem() {
        return this.page.locator('.page-link');
    }

    clickShowOnlyDiscountedProductsCheckbox = () =>
        this.showOnlyDiscountedProductsCheckbox.click();

    clickPageItem = (number: string) =>
        this.pageItem.filter({ hasText: number }).click();
}

export { CatalogPage }