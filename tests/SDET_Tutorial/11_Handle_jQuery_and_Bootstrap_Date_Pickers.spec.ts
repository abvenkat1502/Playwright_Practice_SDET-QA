import{test, expect, Locator, Page} from "@playwright/test";
test("JQuery Date Picker Using Fill Method",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1.Using Fill method to select the date on the date picker
    const date_Picker_1:Locator = page.locator("#datepicker");
    expect(date_Picker_1).toBeVisible();
    await date_Picker_1.fill("01/01/2000");
    await page.waitForTimeout(5000);
})

test("JQuery Date Picker without Using Fill Method",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //2. Select the date on the date picker by manual action
    const date_Picker_1:Locator = page.locator("#datepicker");
    await expect(date_Picker_1).toBeVisible();
    await date_Picker_1.click();

    const targetDay:string = "1";
    const targetMonth:string = "January";
    const targetYear:string = "2028";
    
    const displayDay:Locator[] = await page.locator(".ui-datepicker-calendar tbody td").all();
    const previousBtn:Locator = page.locator(".ui-datepicker-prev");
    const nextBtn:Locator = page.locator(".ui-datepicker-next");

    //Redirecting Respective month
    while(true){

        const displayMonth:string = await page.locator(".ui-datepicker-month").innerText();
        const displayYear:string = await page.locator(".ui-datepicker-year").innerText();
        if (displayMonth === targetMonth && displayYear === targetYear) {
            break;
        } else {
            //await previousBtn.click();
            await nextBtn.click();
        }

    }

    //Select date
    for (const element of displayDay) {
        const date:string = await element.innerText();
        if(date === targetDay){
            element.click();
            await page.waitForTimeout(5000);
        }
    }
    expect(date_Picker_1).toHaveValue("01/01/2028")

})

test("JQuery Date Picker with reusable function",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    //Click the date picker
    const date_Picker_1:Locator = page.locator("#datepicker");
    await expect(date_Picker_1).toBeVisible();
    await date_Picker_1.click();
    await page.waitForTimeout(3000);
    
    //Data Picker Function
    async function Date_Picker_1(targetMonth:string, targetDay:string, targetYear:string, page:Page, isItFuture:boolean)
    {

        
        const previousBtn:Locator = page.locator(".ui-datepicker-prev");
        const nextBtn:Locator = page.locator(".ui-datepicker-next");

        //Redirecting Respective month
        while(true){

            const displayMonth:string = await page.locator(".ui-datepicker-month").innerText();
            const displayYear:string = await page.locator(".ui-datepicker-year").innerText();
            if (displayMonth === targetMonth && displayYear === targetYear) {
                break;
            } 

            if (isItFuture) {
                //await page.locator(".ui-datepicker-next").click();
                await nextBtn.click();
            } else {
                //await page.locator(".ui-datepicker-prev").click();
                await previousBtn.click();
            }

        }

        //Select date
        const displayDay:Locator[] = await page.locator(".ui-datepicker-calendar tbody td").all();
        for (const element of displayDay) {
            const date:string = await element.innerText();
            if(date === targetDay){
                element.click();
                await page.waitForTimeout(5000);
            }
        }

    }

    //Call the datepicker function
    await Date_Picker_1("February", "2", "2025", page, false);
    expect(date_Picker_1).toHaveValue("02/02/2025")
})

test("Bootstrap date picker with reusable function",async({page})=>{
    await page.goto("https://www.booking.com/");
    await page.locator('button[aria-label="Dismiss sign-in info."]').click();
    const datePicker:Locator = page.locator('button[data-testid="searchbox-dates-container"]');
    await datePicker.click();
    const nextBtn:Locator = page.locator('button[aria-label="Next month"]');

    //Check-In Function
    async function checkIn(targetDay:string, targetMonth:string, targetYear:string, page:Page){
    
        //select functionality
        while(true){

            const calender:string[] = (await page.locator(".e7addce19e.af236b7586").first().innerText()).split(" ");
            const displayMonth:string = calender[0];
            const displayYear:string = calender[1];

            if (targetMonth === displayMonth && targetYear === displayYear) {
                break;
            } else {
               await nextBtn.click();
              
            }

        }

        const displayDay:Locator[] = await page.locator('.b8fcb0c66a').first().locator('tbody td').all();
        for (const ele of displayDay) {
            const day:string = await ele.innerText();
            if(targetDay === day){
                await ele.click();
                await page.waitForTimeout(5000);
            }
        }

    }
    
    //Check-In Function
    async function checkOut(targetDay:string, targetMonth:string, targetYear:string, page:Page){
    
        //select functionality
        while(true){

            const calender:string[] = (await page.locator(".e7addce19e.af236b7586").last().innerText()).split(" ");
            const displayMonth:string = calender[0];
            const displayYear:string = calender[1];

            if (targetMonth === displayMonth && targetYear === displayYear) {
                break;
            } else {
               await nextBtn.click();
              
            }

        }

        const displayDay:Locator[] = await page.locator('.b8fcb0c66a').last().locator('tbody td').all();
        for (const ele of displayDay) {
            const day:string = await ele.innerText();
            if(targetDay === day){
                await ele.click();
                await page.waitForTimeout(5000);
            }
        }

    }

    //test function
    await checkIn("6","June","2026",page);
    await checkOut("6","July","2026",page);
})