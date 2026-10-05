import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
export class FeedbackManagementPage extends BasePage {
    // Locators
    readonly createNew: Locator;
    readonly searchDate: Locator;
    readonly searchNo: Locator;
    readonly searchEmployee: Locator;
    readonly searchTemplate: Locator;
    readonly isActiveFilter: Locator;
    readonly fetchButton: Locator;
    readonly clearButton: Locator;
    readonly dropdownSearch: Locator;
    readonly editIcon: Locator;
    readonly detailsIcon: Locator;
    readonly selectEmployee: Locator;
    readonly selectEmployeevalue: Locator;
    readonly selectTemplate: Locator;
    readonly selectTemplatevalue: Locator;
    readonly selectDate: Locator;
    readonly searchTraining: Locator;
    readonly searchTrainingvalue: Locator;
    readonly searchTrainingSchedule: Locator;
    readonly searchTrainingSchedulevalue: Locator;
    readonly draft: Locator;
    readonly complete: Locator;
    readonly back: Locator;
    readonly feedbackQuestion1: Locator;
    readonly feedbackQuestion2: Locator;




    constructor(page: Page) {
        super(page);
        this.createNew = page.locator("//input[@id='Create']");
        this.searchDate = page.locator("//input[@id='Date']");
        this.searchNo = page.locator("//input[@id='No']");
        this.searchEmployee = page.locator("//input[@placeholder='All Employees']");
        this.searchTemplate = page.locator("//input[@placeholder='All Templates']");
        this.isActiveFilter = page.locator("//span[@id='select2-IsVoid-container']");
        this.fetchButton = page.locator("//input[@id='btnFetch']");
        this.clearButton = page.locator("//button[@id='btnClear']");
        this.dropdownSearch = page.locator("//input[@class='select2-search__field']");
        this.editIcon = page.locator("//a[@title='Edit']");
        this.detailsIcon = page.locator("//a[@title='Details']");
        this.selectEmployee = page.locator("//span[@id='select2-EmployeeId-container']");
        this.selectEmployeevalue = page.locator("//input[@class='select2-search__field']");
        this.selectTemplate = page.locator("//span[@id='select2-TemplateId-container']");
        this.selectTemplatevalue = page.locator("//input[@class='select2-search__field']");
        this.selectDate = page.locator("//input[@id='Date']");
        this.searchTraining = page.locator("//span[@id='select2-TrainingId-container']");
        this.searchTrainingvalue = page.locator("//input[@class='select2-search__field']");
        this.searchTrainingSchedule = page.locator("//span[@id='select2-TrainingScheduleId-container']");
        this.searchTrainingSchedulevalue = page.locator("//input[@class='select2-search__field']");
        this.draft = page.locator("//input[@value='Draft']");
        this.complete = page.locator("//input[@value='Complete']");
        this.back = page.locator("//input[@value='Back']");
        this.feedbackQuestion1 = page.locator("(//input[@placeholder='Enter value'])[1]");
        this.feedbackQuestion2 = page.locator("(//input[@type='number'])[1]");

    }
}