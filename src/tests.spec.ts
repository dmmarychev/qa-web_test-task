import { test, expect, Page } from '@playwright/test';
import { PASSWORD, USERNAME } from './constants/Constants';
import { AuthPage } from './pages/AuthPage';
import { CatalogPage } from './pages/CatalogPage';
import { openEmptyBasket } from './tests/OpenEmptyBasket';
import { clearBasket } from './utils/ClearBasket';
import { openBasketWithOneProduct } from './tests/OpenBasketWithOneProduct';
import { openBasketWithNineDifferentProducts } from './tests/OpenBasketWithNineDifferentProducts';

test.describe('Web QA - Test Task', () => {
  let catalogPage: CatalogPage;


  test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goTo();

    catalogPage = await authPage.signIn(USERNAME, PASSWORD);

    expect(catalogPage.navbar.avatar).toBeVisible;
    expect(catalogPage.navbar.username).toContainText(USERNAME);
  });

  test.describe('Тест-кейс 1', () => {
    test('Переход в пустую корзину',
      async () => openEmptyBasket(catalogPage));
  });

  test.describe('Тест-кейс 2', () => {
    test.beforeEach(async () => {
      await expect(catalogPage.navbar.basketItemsBadge).toHaveText('0');
    });

    test.afterEach(() => clearBasket(catalogPage));

    test('Переход в корзину с 1 неакционным товаром.',
      async () => openBasketWithOneProduct(catalogPage, false));
  });

  test.describe('Тест-кейс 3', () => {
    test.beforeEach(async () => {
      await expect(catalogPage.navbar.basketItemsBadge).toHaveText('0');
    });

    test.afterEach(({ page }) => clearBasket(catalogPage));

    test('Переход в корзину с 1 акционным товаром.',
      async () => openBasketWithOneProduct(catalogPage, true));
  });

  test.describe('Тест-кейс 4', () => {
    test.beforeEach(async () => {
      await openBasketWithOneProduct(catalogPage, true);
      await catalogPage.navbar.clickBrandName();
    });

    test.afterEach(({ page }) => clearBasket(catalogPage));

    test('Переход в корзину с 9 разными товарами.',
      async () => openBasketWithNineDifferentProducts(catalogPage));
  });
});