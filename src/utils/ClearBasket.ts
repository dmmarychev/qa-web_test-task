import { expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";
import { BasketPage } from "../pages/BasketPage";

const clearBasket = async (page: CatalogPage | BasketPage) => {
    await page.navbar.clickBrandName();

    const basketMenu = await page.navbar.clickBasketButton();

    await expect(basketMenu.menuContainer).toBeVisible();

    await basketMenu.clickClearBasketButton();
}



export { clearBasket }