import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
export class TrainingPage extends BasePage {
    // Locators
    readonly createNew: Locator;
    readonly search: Locator;
    readonly activeFilter: Locator;
    readonly fetchButton: Locator;
    readonly clearButton: Locator;
    readonly code: Locator;
    readonly name: Locator;
    readonly durationPeriod: Locator;
    readonly skills: Locator;
    readonly employeeContribution: Locator;
    readonly minimalRequirement: Locator;
    readonly remarks: Locator;
    readonly expiry: Locator;
    readonly courseExpiry: Locator;
    readonly courseExpiryDurationInDays: Locator;
    readonly curriculum: Locator;
    readonly certificate: Locator;
    readonly isActive: Locator;
    readonly saveAndClose: Locator;
    readonly back: Locator;
    readonly editIcon: Locator;
    readonly alert: Locator;
    readonly popupOk: Locator;
    readonly codeName: Locator;
    readonly courseName: Locator;
    readonly alertATIndex: Locator;

    constructor(page: Page) {
    super(page);
    this.createNew = page.locator("//input[@id='Create']");
    this.search = page.locator("//input[@id='SearchString']");
    this.activeFilter = page.locator("//select[@id='DropDown']");
    this.fetchButton = page.locator("//input[@id='searchstring']");
    this.clearButton = page.locator("//button[@id='clear']");
    this.code = page.locator("//input[@id='Code']");
    this.name = page.locator("//input[@id='Name']");
    this.durationPeriod = page.locator("//input[@id='DurationPeriod']");
    this.skills = page.locator("//input[@id='Skills']");
    this.employeeContribution = page.locator("//input[@id='EmployeeContribution']");
    this.minimalRequirement = page.locator("//input[@id='MinimalRequirement']");
    this.remarks = page.locator("//textarea[@id='Remarks']");
    this.expiry = page.locator("//input[@id='Expiry']");
    this.courseExpiry = page.locator("//input[@name='IsCourseExpiry']");
    this.courseExpiryDurationInDays = page.locator("//input[@id='CourseExpiryDurationInDays']");
    this.curriculum = page.locator("//input[@name='Curriculum']");
    this.certificate = page.locator("//input[@name='IsCertificate']");
    this.isActive = page.locator("(//div[contains(@class,'icheckbox_square-blue')])[10]");
    this.saveAndClose = page.locator("//button[@value='Save & Close']");
    this.back = page.locator("//input[@id='btnback']");
    this.editIcon = page.locator("(//a[@title='Edit'])[1]");
    this.alert = page.locator("//div[@id='popup_message']");
    this.popupOk = page.locator("//input[@id='popup_ok']");
    this.codeName = page.locator("//table[@id='trainingmanagementtable']//tbody//tr//td[1]");
    this.courseName = page.locator("//table[@id='trainingmanagementtable']//tbody//tr//td[2]");
    this.alertATIndex = page.locator("(//div[@id='snackbar'])//span[1]");
    }

}