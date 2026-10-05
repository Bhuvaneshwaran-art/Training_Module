import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class EFeedbackPage extends BasePage {
    //Locators
    readonly date: Locator;
    readonly apply: Locator;
    readonly no: Locator;
    readonly searchTemplate: Locator;
    readonly isActiveFilter: Locator;
    readonly dropdownSearch: Locator;
    readonly fetchButton: Locator;
    readonly clearButton: Locator;
    readonly editIcon: Locator;
    readonly draft: Locator;
    readonly complete: Locator;
    readonly back: Locator;
    readonly feedbackQuestion1: Locator;
    readonly feedbackQuestion2: Locator;
    readonly detailsIcon: Locator;
    readonly deleteIcon: Locator;
    readonly alert: Locator;
    readonly popupOk: Locator;

  constructor(page: Page) {
    super(page);
    this.date = page.locator("//input[@id='Date']");
    this.apply = page.locator("//button[text()='Apply']");
    this.no = page.locator("//input[@id='No']");
    this.searchTemplate = page.locator("//input[@placeholder='All Templates']");
    this.isActiveFilter = page.locator("//span[@id='select2-IsVoid-container']");
    this.dropdownSearch = page.locator("(//input[@class='select2-search__field'])[2]");
    this.fetchButton = page.locator("//input[@id='btnFetch']");
    this.clearButton = page.locator("//button[@id='btnClear']");
    this.editIcon = page.locator("//a[@title='Edit']");
    this.detailsIcon = page.locator("//a[@title='Details']");
    this.deleteIcon = page.locator("(//a[@title='Delete']");
    this.draft = page.locator("//input[@value='Draft']");
    this.complete = page.locator("//input[@value='Complete']");
    this.back = page.locator("//input[@value='Back']");
    this.feedbackQuestion1 = page.locator("(//input[@placeholder='Enter value'])[1]");
    this.feedbackQuestion2 = page.locator("(//input[@placeholder='Enter value'])[2]");
    this.alert = page.locator("//div[@id='popup_message']");
    this.popupOk = page.locator("//input[@id='popup_ok']");
    
  }
}
