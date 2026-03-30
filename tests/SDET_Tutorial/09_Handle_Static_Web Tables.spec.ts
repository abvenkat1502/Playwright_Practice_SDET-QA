import{test, expect, Locator} from "@playwright/test";
import { log } from "node:console";

test("Comparing Methods",async({page})=>{

   await page.goto("https://demowebshop.tricentis.com/");
   const products:Locator = page.locator(".product-title");

   //1. textContent(), innerText()
   console.log(await products.nth(1).textContent());
   console.log(await products.nth(1).innerText());
   const productCount = await products.count();

   console.log("-----innerText()-----");
   for (let index = 0; index < productCount; index++) {
    const ProductName:string = await products.nth(index).innerText();
    console.log(ProductName);
   }
   
   console.log("-----textContent()-----");
   for (let index = 0; index < productCount; index++) {
    const productName:string | null = await products.nth(index).textContent();
    console.log(productName);
   }

   console.log("-----textContent() using trim()-----");
   for (let index = 0; index < productCount; index++) {
    const productName:string | null = await products.nth(index).textContent();
    console.log(productName?.trim());
   }

   //2. allTextContents(), allInnerTexts()
   const productsList:string[] = await products.allInnerTexts();
   console.log("-----allInnerTexts()-----");
   console.log(productsList);

   const productsList1:string[] = await products.allTextContents();
   console.log("-----allInnerTexts()-----");
   console.log(productsList1);

   const productsList2:string[] = (await products.allTextContents()).map(text=>text.trim());
   console.log("-----allInnerTexts() using trim()-----");
   console.log(productsList2);

   //3.all()
   const productsArray:Locator[] = await products.all();
   console.log(await productsArray[1].innerText());
   console.log("-----all()-----");
   for (const product of productsArray) {
    console.log(await product.innerText());
   }
})

test("Static Web Table",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Count no.of rows and assert in two approches
    const rows:Locator = page.locator("table[name='BookTable'] tr");
    await expect(rows).toHaveCount(7);

    const rowsCount:number = await rows.count();
    expect(rowsCount).toBe(7);

    //2. Count no.of header and assert in two approaches
    const header:Locator = rows.locator("th");
    await expect(header).toHaveCount(4);

    const headercount:number = await header.count();
    expect(headercount).toBe(4);

    //3. Read all data from 2nd row
    const secRow:Locator = rows.nth(2).locator("td");
    const secRow_td:string[] = await secRow.allInnerTexts();
    console.log("2nd Row Values are : ", secRow_td);
    expect(secRow).toHaveText(['Learn Java','Mukesh','Java','500'])

    console.log("------Printing 2nd row values------");
    for (const value of secRow_td) {
        console.log(value);
    }

    //4. Read all data from the table
    console.log("-----All td values are-----");
    const rowData:Locator[] = await rows.all();
    for (const row of rowData.slice(1)) {
        const tdValue:string[] = await row.locator("td").allInnerTexts();
        console.log(tdValue.join("\t"));
    }
    
    
    //5. Print Mukesh written book name
    const booksList:string[] = [];
    for (const row of rowData.slice(1)) {
        const tdValue:string[] = await row.locator("td").allInnerTexts();
        let bookName:string = tdValue[0];
        let author:string = tdValue[1];
        if(author === "Mukesh"){
            console.log(` Mukesh written Book - ${bookName}`);
            booksList.push(bookName);
        }
    }
    expect(booksList).toHaveLength(2);

    //6. Sum of book prices
    let totalPrice:number = 0;
    for (const row of rowData.slice(1)) {
        const tdValue:string[] = await row.locator("td").allInnerTexts();
        let bookPrice:string = tdValue[3];
        totalPrice  = totalPrice + parseInt(bookPrice);
    }
    console.log("Total Book Amount : ", totalPrice);
    expect(totalPrice).toBe(7100);
    
});
