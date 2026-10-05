import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async jsClick(locator: Locator): Promise<void> {
  await locator.evaluate(
    (element) => (element as HTMLElement).click()
  );
}

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async fillAndEnter(locator: Locator, value: string): Promise<void> {
    await this.fill(locator, value);
    await this.enter();
  }
  
  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  async waitForVisible(locator: Locator, timeout = 50000): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }
  
async waitForVisible1(locator: Locator, timeout: number = 50000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  async fillAndBlur(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await locator.press("Tab");
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isHidden(locator: Locator): Promise<boolean> {
    return await locator.isHidden();
  }

  async selectByLabel(locator:Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  async enter(){
    await this.page.keyboard.press("Enter");
  }

  async clear(locator: Locator): Promise<void> {
    await locator.fill("");
  }

  async ctrlAll(locator: Locator): Promise<void> {
    await locator.press("Control+A");
  }

  async delete(locator: Locator): Promise<void> {
    await locator.press("Delete");
  }

  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  async arrowLeft(): Promise<void> {
    await this.page.keyboard.press("ArrowLeft");
  }

  async arrowRight(): Promise<void> {
    await this.page.keyboard.press("ArrowRight");
  }

  async type(locator: Locator, text: string): Promise<void>{
     await locator.click();
    await locator.press("Control+A");
    await locator.pressSequentially(text);
  }



}