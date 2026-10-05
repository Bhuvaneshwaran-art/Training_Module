import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class EmployeeTrainingPage extends BasePage {
    //Locators
    readonly createNew: Locator;
    readonly chooseTraining: Locator;
    readonly chooseTrainingSelect: Locator;
    readonly fetchButton: Locator;
    readonly clearButton: Locator;
    readonly editIcon: Locator;
    readonly detailsIcon: Locator;
    readonly deleteIcon: Locator;
    readonly department: Locator;
    readonly employeeType: Locator;
    readonly training: Locator;
    readonly trainingScheduling: Locator;
    readonly schedulingDate: Locator;
    readonly zone: Locator;
    readonly location: Locator;
    readonly employeePopup: Locator;
    readonly employeeSearch: Locator;
    readonly employeeSelect: Locator;
    readonly submit: Locator;
    readonly cancel: Locator;
    readonly template: Locator;
    readonly addbtn: Locator;
    readonly clearbtn: Locator;


  constructor(page: Page) {
    super(page);
    this.createNew = page.locator("//input[@id='Create']");
    this.chooseTraining = page.locator("//span[@id='select2-Training-container']");
    this.chooseTrainingSelect = page.locator("//input[@id='Training']");
    this.fetchButton = page.locator("//input[@id='searchstring']");
    this.clearButton = page.locator("//button[@id='clear']");
    this.editIcon = page.locator("//a[@title='Edit']");
    this.detailsIcon = page.locator("//a[@title='Details']");
    this.deleteIcon = page.locator("//a[@title='Delete']");
    this.department = page.locator("//span[@id='select2-Department-container']");
    this.employeeType = page.locator("//span[@id='select2-EmployeeType-container']");
    this.training = page.locator("//span[@id='select2-Training-container']");
    this.trainingScheduling = page.locator("//span[@id='select2-TrainingScheduling-container']");
    this.schedulingDate = page.locator("//input[@id='TrainingSchedulingDate']");
    this.zone = page.locator("//span[@id='select2-ZoneMaster-container']");
    this.location = page.locator("//span[@id='select2-LocationMasters-container']");
    this.employeePopup = page.locator("//input[@id='btnpopup']");
    this.employeeSearch = page.locator("//input[@id='SearchString']");
    this.employeeSelect = page.locator("//input[@id='CheckOne']");
    this.submit = page.locator("//input[@id='Ok']");
    this.cancel = page.locator("//input[@id='Cancel2']");
    this.template = page.locator("//span[@id='select2-TemplateId-container']");
    this.addbtn = page.locator("//input[@value='Add']");
    this.clearbtn = page.locator("//button[@id='clear']");
  }
}