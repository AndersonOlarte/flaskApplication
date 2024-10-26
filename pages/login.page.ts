import { Page, Locator, expect } from "@playwright/test";

export class TodoismLoginPage {
    readonly page                    : Page;
    readonly getTestAccountButton    : Locator;
    readonly usernameInput           : Locator;
    readonly successNotificationToast: Locator;
    readonly loginButton             : Locator;

    constructor(page: Page) {
        this.page                     = page;
        this.getTestAccountButton     = this.page.getByText('Get a test account');
        this.usernameInput            = this.page.getByPlaceholder('Username');
        this.successNotificationToast = this.page.locator('#toast-container').getByText('Generate success.');
        this.loginButton              = this.page.locator('#login-btn');
    }

    clickOnGetTestAccount = async (): Promise<void> => {
        await this.getTestAccountButton.click();
    }
    
    awaitForUserGeneration = async (): Promise<string> => {
        await expect(this.successNotificationToast).toHaveText('Generate success.');
        return await this.usernameInput.inputValue();
    }
    
    clickOnLogin = async (): Promise<void> => {
        await this.loginButton.click();
    }
}