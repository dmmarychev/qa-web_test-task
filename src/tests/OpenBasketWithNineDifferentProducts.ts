import { expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";
import { clearBasket } from "../utils/ClearBasket";
import { getRandomLocator } from "../utils/random/GetRandomLocator";

const openBasketWithNineDifferentProducts = async (
    page: CatalogPage,
    addedProductTitle: string,
    addedProductPrice: string,
    count: number
) => {
    const totalPagesCount = await page.pageItem.count();

    let totalProductsPrice = parseInt(addedProductPrice);

    for (let currentPage = 1; currentPage <= totalPagesCount; currentPage++) {
        await page.clickPageItem(currentPage.toString());
        await expect(page.activePageItem).toHaveText(currentPage.toString());

        const productsOnPage = await page.productCard.productCardContainer.count();

        if (await page.navbar.basketItemsBadge.textContent() != count.toString()) {
            for (let currentProductIndex = 0; currentProductIndex < productsOnPage; currentProductIndex++) {
                const currentProduct = page.productCard.productCardContainer.nth(currentProductIndex);
                const currentProductName = await page.productCard.getProductName(currentProduct);

                if (currentProductName != addedProductTitle) {
                    const currentBasketItemsCount = await page.navbar.basketItemsBadge.textContent() ?? "";
                    await page.productCard.clickBuyProductButton(currentProduct);
                    await expect(page.navbar.basketItemsBadge).not.toHaveText(currentBasketItemsCount);

                    totalProductsPrice += parseInt(await page.productCard.getProductResultPrice(currentProduct));
                }

                if (await page.navbar.basketItemsBadge.textContent() == count.toString()) {
                    break;
                }
            }
        } else {
            break;
        }
    }

    const basketMenu = await page.navbar.clickBasketButton();

    await expect(basketMenu.menuContainer).toBeVisible();
    await expect(basketMenu.basketItemContainer).toHaveCount(1);

    await expect(basketMenu.basketItemTitle).toHaveCount(count);
    await expect(basketMenu.basketItemPrice).toHaveCount(count);
    await expect(basketMenu.totalBasketPrice).toContainText(totalProductsPrice.toString());

    await basketMenu.clickGoToBasketPageButton();
}



export { openBasketWithNineDifferentProducts }