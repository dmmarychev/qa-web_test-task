import { expect } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { CatalogPage } from "../pages/CatalogPage";
import { clearBasket } from "../utils/ClearBasket";
import { getRandomLocator } from "../utils/random/GetRandomLocator";

const openBasketWithNineDifferentProducts = async (page: CatalogPage) => {
    const basketMenu = await page.navbar.clickBasketButton();
    const addedDiscountedProductName = await basketMenu.basketItemTitle.textContent();
    await page.navbar.clickBasketButton();

    const totalPagesCount = await page.pageItem.count();

    while (await page.navbar.basketItemsBadge.textContent() != "9") {

        for (let currentPage = 1; currentPage <= totalPagesCount; currentPage++) {

            await page.clickPageItem(currentPage.toString());

            const productsOnPage = await page.productCard.productCardContainer.count();

            for (let i = 0; i < productsOnPage; i++) {
                const currentProduct = page.productCard.productCardContainer.nth(i);
                const currentProductName = await page.productCard.getProductName(currentProduct);

                if (currentProductName != addedDiscountedProductName) {
                    await page.productCard.clickBuyProductButton(currentProduct);
                }
            }
        }
    }
}



export { openBasketWithNineDifferentProducts }