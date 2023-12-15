import { expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";

const openEmptyBasket = async (page: CatalogPage) => {
    await expect(page.navbar.basketItemsBadge).toHaveText('0');

    const basketMenu = await page.navbar.clickBasketButton();

    await expect(basketMenu.menuContainer).toBeVisible();

    await expect(basketMenu.basketItemContainer).toHaveCount(1);

    await basketMenu.clickGoToBasketPageButton();
}



export { openEmptyBasket }