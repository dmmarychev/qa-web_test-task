import { Page, expect } from '@playwright/test';
import { qaAttrSelector } from '../utils/selectors/QaAttrSelector';
import { CatalogPage } from './CatalogPage';

class AuthPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get loginInput() {
        return this.page.getByTestId('loginform-username');
    }

    get passwordInput() {
        return this.page.getByTestId('loginform-password');
    }

    get logInButton() {
        return this.page.locator('[name="login-button"]');
    }

    goTo = () =>
        this.page.goto('/login');


    fillLoginInput = (login: string) =>
        this.loginInput.pressSequentially(login);


    fillPasswordInput = (password: string) =>
        this.passwordInput.pressSequentially(password);

    clickLogInButton = () =>
        this.logInButton.click();

    signIn = async (login: string, password: string) => {
        await this.fillLoginInput(login);
        await this.fillPasswordInput(password);
        await this.clickLogInButton();

        return new CatalogPage(this.page);
    };
}

export { AuthPage }