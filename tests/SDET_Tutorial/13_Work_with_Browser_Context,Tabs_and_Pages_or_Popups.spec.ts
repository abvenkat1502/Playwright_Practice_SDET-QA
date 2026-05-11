import {test, expect, Locator, chromium, Page} from "@playwright/test"

test("Type 1 Using own fixture and openup 2 tabs on the same browser", async({})=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(5000);
    const page1 = await context.newPage();
    await page1.goto("https://www.booking.com/");
    await page1.waitForTimeout(5000);
})

test("Type 2 Using own fixture and openup 2 tabs on the same browser", async({browser})=>{

    //const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(5000);
    const page1 = await context.newPage();
    await page1.goto("https://www.booking.com/");
    await page1.waitForTimeout(5000);
})

test("Type 3 Using own fixture and openup 2 tabs on the same browser", async({context})=>{

    //const browser = await chromium.launch();
    //const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(5000);
    const page1 = await context.newPage();
    await page1.goto("https://www.booking.com/");
    await page1.waitForTimeout(5000);
});

test("Handling Tab/Pages",async({})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //Promise at a time both event trigger and button click action
   const [childPage] = await Promise.all([context.waitForEvent("page"), parentPage.locator("button:has-text('New Tab')").click()]);
   await childPage.waitForTimeout(5000);

   const pagess:Page[] = context.pages();
   console.log("Total page count", pagess.length);

   //get the title of these pages using context
   console.log("Partent Page Title", await pagess[0].title());
   console.log("Child Page Title", await pagess[1].title());

   //get the title of these pages using parent and child
   console.log("Partent Page Title", await parentPage.title());
   console.log("Child Page Title", await childPage.title());
});

test.only("Handle child windows",async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Click on the popup window btn
   const [popupWindows] =  await Promise.all([page.waitForEvent("popup"),page.locator("#PopUp").click()]);
    await popupWindows.waitForTimeout(5000);

    const windows:Page[] = context.pages();
    console.log("Total openup windows are : ", windows.length);

    //Url of each windows
    console.log(windows[0].url());
    console.log(windows[1].url());
    console.log(windows[2].url());

    //Click on the Get Started button on playwright popup
    for (const window of windows) {
        const windowTitle = await window.title();
        if(windowTitle.includes("Playwright")){
            await window.locator(".getStarted_Sjon").click();
            await page.waitForTimeout(5000);
            await window.close();
        }
    }
    
});