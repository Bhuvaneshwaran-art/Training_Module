import { test, expect, type Page } from "@playwright/test";
import path from "path";
import { readExcelSheet } from "../utils/excelReader";

// Adjust these imports to match your actual page object locations
import { TrainingPage } from "../pages/training";
import { TrainingSchedulingPage } from "../pages/training_scheduling";
import { FeedbackManagementPage } from "../pages/feedback_management";
import { LoginPage } from "../pages/login.page";

// ---------------------------------------------------------------------------
// Each sheet is independent — different row counts, unrelated rows. Each
// sheet drives its own set of tests, looping only over its own data.
//
// Expected workbook: testdata/TestData.xlsx with 3 sheets:
//
//   Training           -> Code, Name, DurationPeriod, Skills,
//                          EmployeeContribution, MinimalRequirement,
//                          Remarks, IsActive
//
//   TrainingScheduling -> Course, Provider, StartDate, EndDate, Discount,
//                          DiscountByWho, Fees, GstType, Funding,
//                          CreditAmount, InvoiceNo, DateOfPayment, Paymode,
//                          Language, Department, EmployeeType,
//                          CourseOrganization, Zone, Location, EmployeeCode,
//                          Status, Template
//
//   FeedbackManagement -> EmployeeCode, Template, Question1, Question2
// ---------------------------------------------------------------------------

test.describe("Login Tests", () => {

  test("should login successfully", async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);

      // Navigate to the app
          await loginPage.goto("https://payv2.dev.adaptivegroups.asia/");
      
          // Perform login
          await loginPage.fillAndBlur(loginPage.companyName, "sidco");
          await loginPage.fillAndBlur(loginPage.userName, "Mukesh");
          await loginPage.waitForVisible(loginPage.password);
          await loginPage.fill(loginPage.password, "Adaptive*123");
          await loginPage.click(loginPage.loginButton);
      
          // Assert successful login — update URL/selector based on your app
          await expect(page).not.toHaveURL(/login/i);

  });

});

const dataFilePath = path.resolve("D:/Payroll_Automation/KKL_Training/testdata/TestData.xlsx");

const trainingData = readExcelSheet(dataFilePath, "Training");
const schedulingData = readExcelSheet(dataFilePath, "TrainingScheduling");
const feedbackData = readExcelSheet(dataFilePath, "FeedbackManagement");

// ============================================================= Training =====
test.describe("Training - Data Driven", () => {
  for (let i = 0; i < trainingData.length; i++) {
    const training = trainingData[i];
    if (!training) continue;

    test(`Create Training - Row ${i + 1} (${training.Code})`, async ({ page }: { page: Page }) => {
      const trainingPage = new TrainingPage(page);
      

      await trainingPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Employee/Training");
      await trainingPage.click(trainingPage.createNew);
      await trainingPage.fill(trainingPage.code, training.Code);
      await trainingPage.fill(trainingPage.name, training.Name);
      await trainingPage.fill(trainingPage.durationPeriod, String(training.DurationPeriod));
      await trainingPage.fill(trainingPage.skills, training.Skills);
      await trainingPage.fill(trainingPage.employeeContribution, training.EmployeeContribution);
      await trainingPage.fill(trainingPage.minimalRequirement, training.MinimalRequirement);
      await trainingPage.fill(trainingPage.remarks, training.Remarks);

      const wantActive = ["yes", "true", "1"].includes(String(training.IsActive).toLowerCase());
      const isCurrentlyActive = await trainingPage.isActive.isChecked();
      if (wantActive !== isCurrentlyActive) {
        await trainingPage.click(trainingPage.isActive);
      }
      // await trainingPage.click(trainingPage.saveAndClose);
    });
  }
});

// ==================================================== Training Scheduling ===
test.describe("Training Scheduling - Data Driven", () => {
  for (let i = 0; i < schedulingData.length; i++) {
    const scheduling = schedulingData[i];
    if (!scheduling) continue;

    test(`Create Training Scheduling - Row ${i + 1} (${scheduling.Course})`, async ({ page }: { page: Page }) => {
      const trainingSchedulingPage = new TrainingSchedulingPage(page);

      await trainingSchedulingPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Employee/TrainingScheduling");
      await trainingSchedulingPage.click(trainingSchedulingPage.createNew);

      await trainingSchedulingPage.click(trainingSchedulingPage.course);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Course);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.provider);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Provider);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.providerLocation);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.clear(trainingSchedulingPage.startDate);
      await trainingSchedulingPage.clear(trainingSchedulingPage.endDate);
      await trainingSchedulingPage.fill(trainingSchedulingPage.startDate, scheduling.StartDate);
      await trainingSchedulingPage.fill(trainingSchedulingPage.endDate, scheduling.EndDate);
      // await trainingSchedulingPage.fill(trainingSchedulingPage.fromTime, scheduling.FromTime);
      // await trainingSchedulingPage.fill(trainingSchedulingPage.toTime, scheduling.ToTime);

      await trainingSchedulingPage.fill(trainingSchedulingPage.discount, String(scheduling.Discount));
      await trainingSchedulingPage.fill(trainingSchedulingPage.discountByWho, scheduling.DiscountByWho);
      await trainingSchedulingPage.fill(trainingSchedulingPage.fees, String(scheduling.Fees));

      await trainingSchedulingPage.click(trainingSchedulingPage.gstType);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.GstType);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.fill(trainingSchedulingPage.funding, String(scheduling.Funding));
      await trainingSchedulingPage.fill(trainingSchedulingPage.creditAmount, String(scheduling.CreditAmount));
      await trainingSchedulingPage.fill(trainingSchedulingPage.invoiceNo, scheduling.InvoiceNo);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dateOfPayment, scheduling.DateOfPayment);

      await trainingSchedulingPage.click(trainingSchedulingPage.paymode);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Paymode);

      await trainingSchedulingPage.click(trainingSchedulingPage.language);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Language);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.department);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Department);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.employeeType);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.EmployeeType);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.courseOrganization);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.CourseOrganization);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.zone);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Zone);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.location);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Location);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.employeePopup);
      await trainingSchedulingPage.type(trainingSchedulingPage.employeeSearch, scheduling.EmployeeCode);
      await trainingSchedulingPage.click(trainingSchedulingPage.employeeSelect);
      await trainingSchedulingPage.click(trainingSchedulingPage.submit);

      await trainingSchedulingPage.click(trainingSchedulingPage.status);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Status);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.template);
      await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, scheduling.Template);
      await trainingSchedulingPage.enter();

      await trainingSchedulingPage.click(trainingSchedulingPage.addButton);
      // await trainingSchedulingPage.click(trainingSchedulingPage.clearbtn);
    });
  }
});

// ===================================================== Feedback Management ==
test.describe("Feedback Management - Data Driven", () => {
  for (let i = 0; i < feedbackData.length; i++) {
    const feedback = feedbackData[i];
    if (!feedback) continue;

    test(`Submit Feedback - Row ${i + 1} (${feedback.EmployeeCode})`, async ({ page }: { page: Page }) => {
      const feedbackManagementPage = new FeedbackManagementPage(page);

      await feedbackManagementPage.goto("https://payv2.dev.adaptivegroups.asia/PAY/Payroll/FeedbackManagement");
      await feedbackManagementPage.click(feedbackManagementPage.createNew);

      await feedbackManagementPage.click(feedbackManagementPage.selectEmployee);
      await feedbackManagementPage.fill(feedbackManagementPage.dropdownSearch, feedback.EmployeeCode);
      await feedbackManagementPage.enter();

      await feedbackManagementPage.click(feedbackManagementPage.selectTemplate);
      await feedbackManagementPage.fill(feedbackManagementPage.dropdownSearch, feedback.Template);
      await feedbackManagementPage.enter();

      await feedbackManagementPage.fill(feedbackManagementPage.feedbackQuestion1, feedback.Question1);
      await feedbackManagementPage.fill(feedbackManagementPage.feedbackQuestion2, String(feedback.Question2));

      await feedbackManagementPage.click(feedbackManagementPage.draft);
    });
  }
});