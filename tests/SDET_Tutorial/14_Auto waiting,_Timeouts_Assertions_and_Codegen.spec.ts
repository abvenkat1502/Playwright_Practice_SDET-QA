import{test,expect, Locator} from '@playwright/test';

test("Auto Wait for actions",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2");
    await page.locator("input[placeholder='Password']").fill("Test@123");
    await page.locator("#btnLogin").click();
})

test("Forcing actions",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2",{force:true});
    await page.locator("input[placeholder='Password']").fill("Test@123",{force:true});
    await page.locator("#btnLogin").click({force:true});
})

test("Auto Wait for test customization",async({page})=>{
    test.setTimeout(1000);
    await page.goto("http://192.168.1.11:84/")
})

test("Auto Wait for test customization 1",async({page})=>{
    //test.setTimeout(1000);
    await page.goto("http://192.168.1.11:84/")
})

test("Auto Wait for Assertion customization",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2");
    await page.locator("input[placeholder='Password']").fill("Test@123");
    await page.locator("#btnLogin").click();
    const logo = page.locator("img[alt='Hospital Building']");
    await expect(logo).toBeVisible({timeout:1000});


})

test("Auto Wait for Assertion customization 1",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2");
    await page.locator("input[placeholder='Password']").fill("Test@123");
    await page.locator("#btnLogin").click();
    const logo = page.locator("img[alt='Hospital Building']");
    await expect(logo).toBeVisible();

})

//Assertion
test.only("Hard Assertion",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2");
    await page.locator("input[placeholder='Password']").fill("Test@123");
    await page.locator("#btnLogin").click();
    await page.waitForTimeout(5000);
    const logo = page.locator("img[alt='Hospital Building']");
    await expect(logo).not.toBeVisible();

    const panel = await page.locator("#panel-list").all();
    expect(panel.length).toBe(2);
});

test.only("Soft Assertion",async({page})=>{
    await page.goto("http://192.168.1.11:84/")
    await page.locator("input[placeholder='Employee ID']").fill("au2");
    await page.locator("input[placeholder='Password']").fill("Test@123");
    await page.locator("#btnLogin").click();
    await page.waitForTimeout(5000);
    const logo = page.locator("img[alt='Hospital Building']");
    await expect.soft(logo).not.toBeVisible();

    const panel = await page.locator("#panel-list").all();
    expect.soft(panel.length).toBe(2);
});