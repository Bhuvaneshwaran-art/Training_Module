import { Page, Locator } from "@playwright/test";
import { BasePage } from "../pages/base.page";

export class LoginPage extends BasePage {
  // Locators
  readonly companyName: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly toastMessage: Locator;
  readonly profileIcon: Locator;
  readonly logoffButton: Locator;

  constructor(page: Page) {
    super(page);
    this.companyName = page.locator("(//input[@id='CompanyName'])[1]");
    this.userName    = page.locator("(//input[@id='UserName'])[1]");
    this.password    = page.locator("//input[@id='PasswordInput']");
    this.loginButton = page.locator("(//input[@id='login'])[1]");
    this.toastMessage = page.locator("//span[@id='toastMessage']");
    this.profileIcon = page.locator("(//a[@class='dropdown-toggle'])[2]");
    this.logoffButton = page.locator("//a[text()='Log off']");
  }

}