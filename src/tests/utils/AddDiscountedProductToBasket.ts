import { expect } from "@playwright/test";
import { getRandomLocator } from "../../utils/random/GetRandomLocator";
import { CatalogPage } from "../../pages/CatalogPage";

const addDiscountedProductToBasket = async (page: CatalogPage) => {
    const product = await getRandomLocator(page.productCard.discountedProductCardContainer)
    const productTitle = await page.productCard.getProductName(product) ?? "";
    const productPrice = await page.productCard.getProductResultPrice(product);

    await page.productCard.clickBuyProductButton(product);

    await expect(page.navbar.basketItemsBadge).toHaveText('1');

    return { productTitle: productTitle, productPrice: productPrice };
}



export { addDiscountedProductToBasket }