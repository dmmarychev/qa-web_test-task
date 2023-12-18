import { Locator, expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";
import { clearBasket } from "../utils/ClearBasket";
import { getRandomLocator } from "../utils/random/GetRandomLocator";

const openBasketWithOneNamedDiscountedProducts = async (page: CatalogPage, count: number) => {
    await page.clickShowOnlyDiscountedProductsCheckbox();
    await expect(page.productCard.fullPriceProductCardContainer).toHaveCount(0);

    const productsOnPage = await page.productCard.discountedProductCardContainer.count();

    for (let currentProductIndex = 0; currentProductIndex < productsOnPage; currentProductIndex++) {
        const currentProduct = page.productCard.discountedProductCardContainer.nth(currentProductIndex);
        const currentProductCount = parseInt(await page.productCard.getProductCount(currentProduct) ?? "");

        if (currentProductCount >= count) {
            await page.productCard.fillProductCountInput(currentProduct, count.toString());
            await page.productCard.clickBuyProductButton(currentProduct);

            const totalProductsPrice = parseInt(await page.productCard.getProductResultPrice(currentProduct)) * count;

            await expect(page.navbar.basketItemsBadge).toHaveText(count.toString());

            const basketMenu = await page.navbar.clickBasketButton();

            await expect(basketMenu.menuContainer).toBeVisible();
            await expect(basketMenu.basketItemContainer).toHaveCount(1);

            await expect(basketMenu.basketItemTitle).toHaveCount(count);
            await expect(basketMenu.basketItemPrice).toHaveCount(count);
            await expect(basketMenu.totalBasketPrice).toContainText(totalProductsPrice.toString());

            await basketMenu.clickGoToBasketPageButton();

            break;
        }
    }
}



export { openBasketWithOneNamedDiscountedProducts }