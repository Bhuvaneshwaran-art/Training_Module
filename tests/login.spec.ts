import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";
import { TrainingPage } from "../pages/training";
import { SystemSettingsPage } from "../pages/system_settings";
import { FeedbackTemplatePage } from "../pages/feedback_template";
import { EFeedbackPage } from "../pages/e-feedback";
import { FeedbackManagementPage } from "../pages/feedback_management";
import { TrainingSchedulingPage } from "../pages/training_scheduling";
import { EmployeeTrainingPage } from "../pages/employee_training";

test.describe("Login Tests", () => {

  test("should login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const trainingPage = new TrainingPage(page);
    const feedbackTemplatePage = new FeedbackTemplatePage(page);
    const trainingSchedulingPage = new TrainingSchedulingPage(page);
    const employeeTrainingPage = new EmployeeTrainingPage(page);
    const eFeedbackPage = new EFeedbackPage(page);
    const feedbackManagementPage = new FeedbackManagementPage(page);
    const systemSettingsPage = new SystemSettingsPage(page);

    // Navigate to the app
    await loginPage.goto("https://payv2.dev.adaptivegroups.asia/");
    

    // Perform login
    const usernames: string[] = ["Maheswari"];
    await loginPage.fillAndBlur(loginPage.companyName, "sidco");

    for (const username of usernames) {
    await loginPage.fillAndBlur(loginPage.userName, username);
    await loginPage.waitForVisible(loginPage.password);
    await loginPage.fill(loginPage.password, "Adaptive*123");
    await loginPage.click(loginPage.loginButton);

    if(await loginPage.isVisible(loginPage.toastMessage)){
      console.log(await loginPage.toastMessage.textContent());
      console.log(`Login failed for ${username}`);
      continue;
  }

  console.log(`Login successful with ${username}`);
  break;
    }



    // Assert successful login — update URL/selector based on your app
    await expect(page).not.toHaveURL(/login/i);

    // Navigate to the training management page
    await trainingPage.goto("https://payv2.dev.adaptivegroups.asia/SystemSetting/CreateOrEditV2");

    await systemSettingsPage.enableSystemSetting("Is Advanced Training Management", systemSettingsPage.IsAdvancedTrainingManagement);
    await systemSettingsPage.enableSystemSetting("Is Training GST Management", systemSettingsPage.IsTrainingGSTManagement);

    // Training
    await trainingPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Employee/Training");
    await trainingPage.click(trainingPage.createNew);
    await trainingPage.fill(trainingPage.code, "TR12_Automation");
    await trainingPage.fill(trainingPage.name, "Robotics");

  if(await trainingPage.isVisible(trainingPage.alert)){
      console.log(await trainingPage.alert.textContent());
      await trainingPage.jsClick(trainingPage.popupOk);
      await trainingPage.jsClick(trainingPage.back);
    }

  else {
    //await trainingPage.fill(trainingPage.durationPeriod, "2");
    //await trainingPage.fill(trainingPage.skills, "java, sql");
    //await trainingPage.fill(trainingPage.employeeContribution, "yes");
    await trainingPage.fill(trainingPage.minimalRequirement, "Basic knowledge in java");
    await trainingPage.fill(trainingPage.remarks, "Only elibible for freshers");
    if (!(await trainingPage.isActive.isChecked())) {
      await trainingPage.click(trainingPage.isActive);
    }
    await trainingPage.click(trainingPage.saveAndClose);
  }

    await trainingPage.fill(trainingPage.search, "TR12_Automation");
    await trainingPage.click(trainingPage.fetchButton);
    const codeName = (await trainingPage.codeName.textContent())?.trim();
    const courseName = (await trainingPage.courseName.textContent())?.trim();
    console.log(`Code: ${codeName}, Course Name: ${courseName}`);

    await page.screenshot({ path: "training_screenshot/screenshot.png", fullPage: true });
    await trainingPage.click(trainingPage.editIcon);
    await trainingPage.click(trainingPage.saveAndClose);
    await trainingPage.waitForVisible(trainingPage.alertATIndex);
    console.log(await trainingPage.alertATIndex.textContent());




    // Feedback Template
    await trainingPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Payroll/FeedbackTemplate");
      await feedbackTemplatePage.fill(feedbackTemplatePage.searchTemplate, "Test_Automation12");
      await feedbackTemplatePage.click(feedbackTemplatePage.fetchButton);

      if (await feedbackTemplatePage.isVisible(feedbackTemplatePage.name)) {

        console.log("Feedback template " + feedbackTemplatePage.name.textContent() + " is already exists.");
        await feedbackTemplatePage.click(feedbackTemplatePage.editIcon);

        await page.waitForLoadState("domcontentloaded");
        await feedbackTemplatePage.click(feedbackTemplatePage.save); // click update button

        await feedbackTemplatePage.waitForVisible(feedbackTemplatePage.alert);
        console.log(await feedbackTemplatePage.alert.textContent());
        await feedbackTemplatePage.jsClick(feedbackTemplatePage.popupOk);

        await feedbackTemplatePage.waitForVisible(feedbackTemplatePage.alert);
        console.log(await feedbackTemplatePage.alert.textContent());
        await feedbackTemplatePage.jsClick(feedbackTemplatePage.popupOk);
      }

      else{
        console.log("Feedback template Test_Automation12 does not exist. Creating a new one.");
        await feedbackTemplatePage.click(feedbackTemplatePage.createNew);
        await feedbackTemplatePage.fill(feedbackTemplatePage.templateName, "Test_Automation12");
        await feedbackTemplatePage.click(feedbackTemplatePage.addSectionButton);
        await feedbackTemplatePage.fill(feedbackTemplatePage.sectionTitle, "Section 1");
        await feedbackTemplatePage.click(feedbackTemplatePage.addFieldButton);
        await feedbackTemplatePage.fill(feedbackTemplatePage.fieldTitle, "Feedback about course");
        await feedbackTemplatePage.click(feedbackTemplatePage.valueType);
        await feedbackTemplatePage.fill(feedbackTemplatePage.dropdownSearch, "text-singleline");
        await feedbackTemplatePage.enter();
        await feedbackTemplatePage.click(feedbackTemplatePage.isRequired);
        await feedbackTemplatePage.click(feedbackTemplatePage.addButton);

        await feedbackTemplatePage.click(feedbackTemplatePage.addFieldButton);
        await feedbackTemplatePage.fill(feedbackTemplatePage.fieldTitle, "Course Rating Out of 5");
        await feedbackTemplatePage.click(feedbackTemplatePage.valueType);
        await feedbackTemplatePage.fill(feedbackTemplatePage.dropdownSearch, "text-singleline");
        await feedbackTemplatePage.enter();
        await feedbackTemplatePage.click(feedbackTemplatePage.isRequired);
        await feedbackTemplatePage.click(feedbackTemplatePage.addButton);

        await feedbackTemplatePage.click(feedbackTemplatePage.save);
        await feedbackTemplatePage.waitForVisible(feedbackTemplatePage.alert);
        console.log(await feedbackTemplatePage.alert.textContent());
        await feedbackTemplatePage.jsClick(feedbackTemplatePage.popupOk);
      }




    // Training Scheduling
    await trainingPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Employee/TrainingScheduling");
    await trainingSchedulingPage.click(trainingSchedulingPage.createNew);
    await trainingSchedulingPage.click(trainingSchedulingPage.course);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Robotics");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.provider);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "udamey");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.providerLocation);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Chennai");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.clear(trainingSchedulingPage.startDate);
    await trainingSchedulingPage.clear(trainingSchedulingPage.endDate);
    await trainingSchedulingPage.fill(trainingSchedulingPage.startDate, "02/09/2026");
    await trainingSchedulingPage.fill(trainingSchedulingPage.endDate, "02/09/2026");
    await trainingSchedulingPage.fill(trainingSchedulingPage.courseHours, "2");
    // await trainingSchedulingPage.fill(trainingSchedulingPage.fromTime, "09:00 AM");
    // await trainingSchedulingPage.fill(trainingSchedulingPage.toTime, "05:00 PM");
    await trainingSchedulingPage.fill(trainingSchedulingPage.discount, "10");
    await trainingSchedulingPage.fill(trainingSchedulingPage.discountByWho, "Company");
    await trainingSchedulingPage.fill(trainingSchedulingPage.fees, "1000");
    await trainingSchedulingPage.click(trainingSchedulingPage.gstType);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Exclusive")
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.fill(trainingSchedulingPage.funding, "5000");
    await trainingSchedulingPage.fill(trainingSchedulingPage.creditNote, "2000");
    await trainingSchedulingPage.fill(trainingSchedulingPage.creditNoteNumber, "CN12345");
    await trainingSchedulingPage.fill(trainingSchedulingPage.invoiceNo, "INV12345");
    await trainingSchedulingPage.fill(trainingSchedulingPage.dateOfPayment, "02/09/2026");
    await trainingSchedulingPage.click(trainingSchedulingPage.paymode);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Cash");
    await trainingSchedulingPage.click(trainingSchedulingPage.language);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "English");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.template);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Test_Automation12");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.department);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Electronic");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.employeeType);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Electrician");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.employeePopup);
    await trainingSchedulingPage.type(trainingSchedulingPage.employeeSearch, "EMP-0293");
    await trainingSchedulingPage.click(trainingSchedulingPage.employeeSelect);
    await trainingSchedulingPage.click(trainingSchedulingPage.submit);
    await trainingSchedulingPage.click(trainingSchedulingPage.zone);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "Trichy");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.click(trainingSchedulingPage.location);
    await trainingSchedulingPage.fill(trainingSchedulingPage.dropdownSearch, "CBE");
    await trainingSchedulingPage.enter();
    await trainingSchedulingPage.jsClick(trainingSchedulingPage.addButton);
    // await trainingSchedulingPage.Click(trainingSchedulingPage.clearbtn);
    await trainingSchedulingPage.click(trainingSchedulingPage.saveAndClose);
    if(await trainingSchedulingPage.isVisible(trainingSchedulingPage.alert)){
      console.log(await trainingSchedulingPage.alert.textContent());
      await trainingSchedulingPage.jsClick(trainingSchedulingPage.popupOk);
    }
  else {
    console.log("No alert found.");
  }

    await loginPage.click(loginPage.profileIcon);
    await loginPage.click(loginPage.logoffButton);
    await loginPage.waitForVisible(loginPage.loginButton);
    console.log("Logged off successfully.");

    await loginPage.fillAndBlur(loginPage.userName, "Mukesh");
    await loginPage.waitForVisible(loginPage.password);
    await loginPage.fill(loginPage.password, "Adaptive*123");
    await loginPage.click(loginPage.loginButton);


  // E-Feedback
    await eFeedbackPage.goto("https://payv2.dev.adaptivegroups.asia/pay/Payroll/EFeedback");
    const fillFeedbackDetails = async (): Promise<void> => {
      await eFeedbackPage.click(eFeedbackPage.clearButton);
      await eFeedbackPage.click(eFeedbackPage.date);
      await eFeedbackPage.clear(eFeedbackPage.date);
      await eFeedbackPage.fill(eFeedbackPage.date, "02/09/2026 - 02/09/2026");
      await eFeedbackPage.enter();
      await eFeedbackPage.fill(eFeedbackPage.searchTemplate, "Test_Automation12");
      await eFeedbackPage.enter();
      await eFeedbackPage.click(eFeedbackPage.fetchButton);
      await eFeedbackPage.click(eFeedbackPage.editIcon);
      await page.waitForLoadState("domcontentloaded");
      await eFeedbackPage.waitForVisible(eFeedbackPage.feedbackQuestion1);
      await eFeedbackPage.click(eFeedbackPage.feedbackQuestion1);
      await eFeedbackPage.fill(eFeedbackPage.feedbackQuestion1, "This is a test feedback question.");
      await eFeedbackPage.click(eFeedbackPage.feedbackQuestion2);
      await eFeedbackPage.fill(eFeedbackPage.feedbackQuestion2, "5");
    };
    await fillFeedbackDetails();
    await eFeedbackPage.click(eFeedbackPage.draft);

    await eFeedbackPage.waitForVisible(eFeedbackPage.alert);
    console.log(await eFeedbackPage.alert.textContent());
    await eFeedbackPage.jsClick(eFeedbackPage.popupOk);

    await eFeedbackPage.waitForVisible(eFeedbackPage.alert);
    console.log(await eFeedbackPage.alert.textContent());
    await eFeedbackPage.jsClick(eFeedbackPage.popupOk);

    await fillFeedbackDetails();
    await eFeedbackPage.click(eFeedbackPage.complete);

    await eFeedbackPage.waitForVisible(eFeedbackPage.alert);
    console.log(await eFeedbackPage.alert.textContent());
    await eFeedbackPage.jsClick(eFeedbackPage.popupOk);

    await eFeedbackPage.waitForVisible(eFeedbackPage.alert);
    console.log(await eFeedbackPage.alert.textContent());
    await eFeedbackPage.jsClick(eFeedbackPage.popupOk);

    console.log("successfully filled the feedback form and submitted.");




    // Feedback Management
    // await feedbackManagementPage.goto("https://payv2.dev.adaptivegroups.asia/PAY/Payroll/FeedbackManagement");
    // await feedbackManagementPage.click(feedbackManagementPage.createNew);
    // await feedbackManagementPage.click(feedbackManagementPage.selectEmployee);
    // await feedbackManagementPage.fill(feedbackManagementPage.dropdownSearch, "EMP-0293");
    // await feedbackManagementPage.enter();
    // await feedbackManagementPage.click(feedbackManagementPage.selectTemplate);
    // await feedbackManagementPage.fill(feedbackManagementPage.dropdownSearch, "Test_Automation8");
    // await feedbackManagementPage.enter();
    // await feedbackManagementPage.fill(feedbackManagementPage.feedbackQuestion1, "This is a test feedback question.");
    // await feedbackManagementPage.fill(feedbackManagementPage.feedbackQuestion2, "5");
    // await feedbackManagementPage.click(feedbackManagementPage.draft);


    // take a screenshot after filling the form
    // await page.screenshot({ path: "training_form_filled.png", fullPage: true });

  });

});



