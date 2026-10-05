import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SystemSettingsPage extends BasePage {
    // Locators
    readonly searchSetting: Locator;
    readonly IsAdvancedTrainingManagement: Locator;
    readonly IsTrainingGSTManagement: Locator;
    
    constructor(page: Page) {
        super(page);
        this.searchSetting = page.locator("//input[@id='Search']");
        this.IsAdvancedTrainingManagement = page.locator("//input[@data-id='IsAdvancedTrainingManagement']");
        this.IsTrainingGSTManagement = page.locator("//input[@data-id='IsTrainingGSTManagement']");

    }

    async enableSystemSetting(settingName: string, toggle: Locator): Promise<void> {
    // Search the setting
    await this.fill(this.searchSetting, settingName);

    // Wait until the toggle is visible
    await this.waitForVisible(toggle);

    // Enable only if it is disabled
    if (!(await toggle.isChecked())) {
        await toggle.check();
        console.log(`${settingName} is enabled.`);
    } else {
        console.log(`${settingName} is already enabled.`);
    }
}
}