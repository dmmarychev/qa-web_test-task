import { test, expect, Page } from '@playwright/test';
import { PASSWORD, USERNAME } from './constants/Constants';
import { AuthPage } from './pages/AuthPage';
import { CatalogPage } from './pages/CatalogPage';
import { openEmptyBasket } from './tests/OpenEmptyBasket';
import { clearBasket } from './utils/ClearBasket';
import { openBasketWithOneProduct } from './tests/OpenBasketWithOneProduct';
import { openBasketWithNineDifferentProducts } from './tests/OpenBasketWithNineDifferentProducts';
import { addDiscountedProductToBasket } from './tests/utils/AddDiscountedProductToBasket';
import { openBasketWithOneNamedDiscountedProducts } from './tests/OpenBasketWithNineOneNamedDiscountedProducts';

test.describe.serial('Web QA - Test Task', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goTo();

    catalogPage = await authPage.signIn(USERNAME, PASSWORD);

    expect(catalogPage.navbar.username).toContainText(USERNAME);
    expect(catalogPage.productCard.productCardContainer.first()).toBeVisible();

    if (await catalogPage.navbar.basketItemsBadge.textContent() != '0') {
      await clearBasket(catalogPage);
    }
  });

  test.describe('Тест-кейс 1', async () => {
    test('Переход в пустую корзину', async () => openEmptyBasket(catalogPage));
  });

  test.describe('Тест-кейс 2', () => {
    test.afterEach(() => clearBasket(catalogPage));

    test('Переход в корзину с 1 неакционным товаром.', async () => openBasketWithOneProduct(catalogPage, false));
  });

  test.describe('Тест-кейс 3', () => {
    test.afterEach(() => clearBasket(catalogPage));

    test('Переход в корзину с 1 акционным товаром.', async () => openBasketWithOneProduct(catalogPage, true));
  });

  test.describe('Тест-кейс 4', () => {
    let addedProductTitle: string;
    let addedProductPrice: string;

    test.beforeEach(async () => {
      const addedProduct = await addDiscountedProductToBasket(catalogPage);
      addedProductTitle = addedProduct.productTitle;
      addedProductPrice = addedProduct.productPrice;
    });

    test.afterEach(() => clearBasket(catalogPage));

    test('Переход в корзину с 9 разными товарами.',
      async () => openBasketWithNineDifferentProducts(catalogPage, addedProductTitle, addedProductPrice, 9));
  });

  test.describe('Тест-кейс 5', () => {
    test.afterEach(() => clearBasket(catalogPage));

    test('Переход в корзину с 9 акционными товарами одного наименования.',
      async () => openBasketWithOneNamedDiscountedProducts(catalogPage, 9));
  });
});