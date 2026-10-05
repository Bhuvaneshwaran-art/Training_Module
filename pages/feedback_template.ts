import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
export class FeedbackTemplatePage extends BasePage {
    // Locators
    readonly createNew: Locator;
    readonly searchTemplate: Locator;
    readonly fetchButton: Locator;
    readonly clearButton: Locator
    readonly editIcon: Locator;
    readonly templateName: Locator;
    readonly addSectionButton: Locator;
    readonly sectionTitle: Locator;
    readonly addFieldButton: Locator;
    readonly fieldTitle: Locator;
    readonly valueType: Locator;
    readonly dropdownSearch: Locator;
    readonly isRequired: Locator;
    readonly addButton: Locator;
    readonly dropdownToggle: Locator;
    readonly addAndNew: Locator;
    readonly cancel: Locator;
    readonly save: Locator;
    readonly back: Locator;
    readonly name: Locator;
    readonly alert: Locator;
    readonly popupOk: Locator;

constructor(page: Page) {
    super(page);
    this.createNew = page.locator("//input[@id='Create']");
    this.searchTemplate = page.locator("//input[@id='TemplateName']"); 
    this.fetchButton = page.locator("//input[@id='btnFetch']");
    this.clearButton = page.locator("//button[@id='btnClear']");    
    this.editIcon = page.locator("//a[@title='Edit']");
    this.templateName = page.locator("//input[@id='txtTemplateName']");
    this.addSectionButton = page.locator("//input[@id='btnAddSection']");
    this.sectionTitle = page.locator("//input[@placeholder='Enter section title']");
    this.addFieldButton = page.locator("//button[text()='Add Field']");
    this.fieldTitle = page.locator("//textarea[@id='txtQuestion']");
    this.valueType = page.locator("//span[@id='select2-dpdAnswerType-container']");
    this.dropdownSearch = page.locator("//input[@class='select2-search__field']");
    this.isRequired = page.locator("//input[@id='chkIsRequired']");
    this.addButton = page.locator("//input[@id='btnFieldSubmit']");
    this.dropdownToggle = page.locator("//i[@class='fa fa-caret-down']");
    this.addAndNew = page.locator("//button[@id='btnFieldSubmitAndNew']");
    this.cancel = page.locator("//input[@value='Cancel']");
    this.save = page.locator("//input[@id='btnSaveTemplate']");
    this.back = page.locator("//input[@value='Back']");
    this.name = page.locator("(//table//tbody//tr//td[@class='sorting_1'])[1]");
    this.alert = page.locator("//div[@id='popup_message']");
    this.popupOk = page.locator("//input[@id='popup_ok']");
    }
}