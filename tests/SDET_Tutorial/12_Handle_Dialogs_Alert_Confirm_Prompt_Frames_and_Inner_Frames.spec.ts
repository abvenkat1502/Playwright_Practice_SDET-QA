import test, {expect, Frame} from '@playwright/test'

test("Simple Alert",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',async (dialog)=>{
        const alertTyp:string = dialog.type();
        const alertContent:string = dialog.message();
        console.log("Type Of Alert Is : ", alertTyp);
        console.log("Content of the Alert Message Is : ", alertContent);
        expect(alertTyp).toContain("alert");
        expect(alertContent).toContain("I am an alert box!");
        await dialog.accept();
    });
    
    await page.locator("#alertBtn").click();
    await page.waitForTimeout(5000);

});

test("Confirm Alert",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',async (dialog)=>{
        const alertTyp:string = dialog.type();
        const alertContent:string = dialog.message();
        console.log("Type Of Alert Is : ", alertTyp);
        console.log("Content of the Alert Message Is : ", alertContent);
        expect(alertTyp).toContain("confirm");
        expect(alertContent).toContain("Press a button!");
        //await dialog.accept(); //or
        await dialog.dismiss();
    });
    
    await page.locator("#confirmBtn").click();
    await page.waitForTimeout(5000);
    const responseMsg = await page.locator("#demo").innerText();
    //expect(responseMsg).toContain("You pressed OK!"); //or
    expect(responseMsg).toContain("You pressed Cancel!");
});

test("Promt Alert",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',async (dialog)=>{
        const alertTyp:string = dialog.type();
        const alertContent:string = dialog.message();
        const txtBoxValue:string = dialog.defaultValue();
        console.log("Type Of Alert Is : ", alertTyp);
        console.log("Content of the Alert Message Is : ", alertContent);
        console.log("Default Text Box Value Is: ", txtBoxValue);
        expect(alertTyp).toContain("prompt");
        expect(alertContent).toContain("Please enter your name:");
        
        //Enter value on the text box and click the 'Ok" button
        //await dialog.accept("John Done"); //or
        await dialog.dismiss();
    });
    
    await page.locator("#promptBtn").click();
    await page.waitForTimeout(5000);
    const responseMsg = await page.locator("#demo").innerText();
    //expect(responseMsg).toContain("John Done"); //or
    expect(responseMsg).toContain("User cancelled the prompt.");
});

test("Iframe Approach 1", async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const totalFrames = page.frames();
    console.log("Total Frame Counts Is : ", totalFrames.length);
    const frame1 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    //await frame1?.locator('[type="text"]').fill("ABV"); // or
    if(frame1){
        //await frame1.locator('[type="text"]').fill("ABV");
        await frame1.fill('[type="text"]', 'Test Frame 1');
        await frame1.waitForTimeout(5000);
    }else{
        console.log("Frame Not Found");
    }
})

test("Iframe Approach 2", async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const totalFrames = page.frames();
    console.log("Total Frame Counts Is : ", totalFrames.length);
    const frame2 = page.frameLocator('[src="frame_2.html"]');
    //await frame2?.locator('[type="text"]').fill("ABV"); // or
    if(frame2){
        await frame2.locator('[type="text"]').fill("Test Frame 2");
    }else{
        console.log("Frame Not Found");
    }
})

test("Nested Frame", async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const totalFrames = page.frames();
    console.log("Total Frame Counts Is : ", totalFrames.length);
    const frame3 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
    //await frame3?.locator('[type="text"]').fill("ABV"); // or
    if(frame3){
        await frame3.fill('[type="text"]', 'Test Frame 3');
        const childFrames:Frame[] = frame3.childFrames();
        console.log("Child Frames Length Is : ", childFrames.length);
        //Switch into the child frame
        const childFrame1 = childFrames[0];
        const radioBtn = childFrame1.getByLabel('I am a human');
        await radioBtn.check();
        await childFrame1.waitForTimeout(5000)
        await expect(radioBtn).toBeChecked();

    }else{
        console.log("Frame Not Found");
    }

})

