import { test, expect, Locator } from '@playwright/test';

test("Text Box Actions", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
    const nameField: Locator = page.locator('#name');
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    const lengthTextBox: string | null = await nameField.getAttribute('maxlength')
    expect(lengthTextBox).toBe('15');

    await nameField.fill("John Done");
    const value: string = await nameField.inputValue();
    console.log("Given Input Value : ", value);
    expect(value).toBe("John Done");

    await page.waitForTimeout(5000);
});

test("Radio Button Actions", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const gender: Locator = page.locator('#male');
    await expect(gender).toBeVisible();
    await expect(gender).toBeEnabled();

    expect(await gender.isChecked()).toBe(false);
    await gender.check();
    expect(await gender.isChecked()).toBe(true);
    await expect(gender).toBeChecked();
    await page.waitForTimeout(5000);
});


test.only("Check Box Actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    //1. Select specific check box (Sunday) using getByLabel and asser

    const label:Locator = page.getByLabel('sunday');
    await label.check();
    await expect(label).toBeChecked();
    await page.waitForTimeout(5000);




    //2. Select all check boxes and assert each checkbox is checked

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(val => page.getByLabel(val));
    expect(checkboxes.length).toBe(7);

    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await page.waitForTimeout(1000);
    }


    //3. Uncheck last 3 checkboxes and assert

    for(const checkbox of checkboxes.slice(-2)){
          await checkbox.uncheck();
          await expect(checkbox).not.toBeChecked();
          await page.waitForTimeout(1000);
    }


    //4.Toggle checkboxes: If checked then uncheck, If unchecked then check and assert that.

    for(const checkbox of checkboxes){
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
        await page.waitForTimeout(1000);
    }



    //5.Randomly select the checkboxes - select checkboxes by index(1,3,5) and assert
    const num:number[]=[1,3,5];

    for(const val of num){
        await checkboxes[val].check();
        await expect(checkboxes[val]).toBeChecked();
        await page.waitForTimeout(3000);
    }

    //6. select checkbox based on the label
    const dayName:String = "tUesday";
    for(const day of days){

        if(day.toUpperCase() === dayName.toLocaleUpperCase()){
            await page.getByLabel(day).check();
        }
        await page.waitForTimeout(3000);

    }

})