import {test, expect, Locator} from '@playwright/test';

test.setTimeout(60000);//total test time out 60 sec, test will fail after 60 sec

test("Auto Suggest Dropdown",async ({page})=>{

   await page.goto("https://www.flipkart.com/");

   await page.waitForTimeout(5000);
   await page.getByText("✕").click();

   //1. get all the suggest value on the drop down and print that count. ---> Ctrl+Shift+p ---> emulate focuse page
   await page.locator("form input[name='q']").fill("Smart");
   await page.waitForTimeout(3000);
   const searchList:Locator = page.locator("form li");
   const ResultCount:number = await searchList.count();
   console.log("Search Results is : " , ResultCount);

   //2. get all the suggest value on the drop down and print the value using textContent()
   console.log("-----Using textContent()-----");
   console.log("First position result is : ", await searchList.nth(0).textContent());
   for (let index = 0; index < ResultCount; index++) {
      console.log("Search Result is : ", await searchList.nth(index).textContent());
   }


   //3. get all the suggest value on the drop down and print the value using innerText()
   console.log("-----Using innerText()-----");
   console.log("First position result is : ", await searchList.nth(0).innerText());
   for (let index = 0; index < ResultCount; index++) {
      console.log("Search Result is : ", await searchList.nth(index).innerText());
   }

   //4. get all the suggest value on the drop down and print the value using allTextContent()
   console.log("-----Using allTextContent()-----");
   const alltext1:string[] = await searchList.allTextContents();
   for (const element of alltext1) {
      console.log("Search Result is : ", element);
      
   }

   //5. get all the suggest value on the drop down and print the value using allInnerTexts()
   console.log("-----Using allInnerTexts()-----");
   const alltext2:string[] = await searchList.allInnerTexts();
   for (const element of alltext2) {
      console.log("Search Result is : ", element);
      
   }

   //6. Select the 'smart phone' option
   const searchData = "smartphone";
   for (let index = 0; index < ResultCount ; index++) {

      const result = await searchList.nth(index).textContent();
      
      if (result === searchData) {
         await searchList.nth(index).click();
         break;
      } 

   }
   await page.waitForTimeout(5000);
    
   
})


test.only("Bootstrap Dropdown",async({page})=>{

   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
   //await page.waitForTimeout(3000);

//1. Get the "Job Title dropdown count"

   //Login
   await page.locator("input[name='username']").fill("Admin");
   await page.locator("input[name='password']").fill("admin123");
   await page.locator("button[type='submit']").click();
   //await page.waitForTimeout(3000);
   //Go to PIM
   await page.getByText("PIM").click();
   //await page.waitForTimeout(3000);

   //Click Job Title field down arrow
   await page.locator(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").nth(2).click();
   await page.waitForTimeout(2000);

   //Get the listed values on the dropdwon
   const options:Locator = page.locator("div[role='listbox'] div");
   const optionsCount = await options.count();
   console.log("Dropdown Values : ", optionsCount);

//2. get all the suggest value on the drop down and print the value using allTextContent(), allInnerText(), textContent() and innerText()
   console.log("-----Using allTextContent() & allInnerText()-----");
   console.log("All Text Content Is : ", await options.allTextContents());
   console.log("All Inner Text Is : ", await options.allInnerTexts());
   console.log("-----Using textContent() & innerText()-----");
   
   for (let index = 0; index < optionsCount; index++) {
      console.log("Search Result is : ", await options.nth(index).textContent());
      //or
      console.log("Search Result is : ", await options.nth(index).innerText());
   }
   

//3. Select the 'Automation Tester' option
   const searchData = "Automaton Tester";
   for (let index = 0; index < optionsCount ; index++) {

      const result = await options.nth(index).textContent();
      
      if (result === searchData) {
         await options.nth(index).click();
         break;
      } 

   }
   await page.waitForTimeout(2000);
})