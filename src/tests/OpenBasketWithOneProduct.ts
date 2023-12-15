import { expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";
import { clearBasket } from "../utils/ClearBasket";
import { getRandomLocator } from "../utils/random/GetRandomLocator";

const openBasketWithOneProduct = async (page: CatalogPage, isDiscounted: boolean) => {

    if (isDiscounted) {
        await page.clickShowOnlyDiscountedProductsCheckbox();
        await expect(page.productCard.fullPriceProductCardContainer).toHaveCount(0);
    }

    const product = isDiscounted
        ? await getRandomLocator(page.productCard.discountedProductCardContainer)
        : await getRandomLocator(page.productCard.fullPriceProductCardContainer);

    const productTitle = await page.productCard.getProductName(product);
    const productPrice = await page.productCard.getProductResultPrice(product);

    await page.productCard.clickBuyProductButton(product);

    await expect(page.navbar.basketItemsBadge).toHaveText('1');

    const basketMenu = await page.navbar.clickBasketButton();

    await expect(basketMenu.menuContainer).toBeVisible();
    await expect(basketMenu.basketItemContainer).toHaveCount(1);

    await expect(basketMenu.basketItemTitle).toHaveText(productTitle!);
    await expect(basketMenu.basketItemPrice).toContainText(productPrice);
    await expect(basketMenu.totalBasketPrice).toContainText(productPrice);

    await basketMenu.clickGoToBasketPageButton();
}



export { openBasketWithOneProduct }