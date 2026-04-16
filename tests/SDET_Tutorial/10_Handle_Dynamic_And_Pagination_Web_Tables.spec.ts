import{test,expect,Locator} from "@playwright/test";

test("Handling Dynamic Table",async({page})=>{

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    //1. Get Row Count
    const table:Locator = page.locator(".table.table-striped tbody");
    await expect(table).toBeVisible();

    const rows:Locator[] = await table.locator("tr").all();
    expect(rows).toHaveLength(4);

    //2. STEP 1 - Get chrome CPU load percentage
    let CPUload = " ";
    for(const row of rows){
        const processerName = await row.locator("td").nth(0).innerText();
        if(processerName == "Chrome"){
             //CPUload = await row.locator("td:has-text('%')").innerHTML(); //or
             CPUload = await row.locator("td",{hasText:'%'}).innerHTML();
        }
    }
    console.log("CPU Load % is", CPUload);
    
    //2. STEP 2 - compare the CUP load and label value
    const CPULabel:string = await page.locator("#chrome-cpu").innerText();
    expect(CPULabel).toContain(CPUload); 
})

test("Handling Dynamic Table Values",async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    //3. Get all values from the table
    let hasMorePage = true;
    while(hasMorePage){
        const rows:Locator[] = await page.locator("#example tbody tr").all();
        for (const row of rows) {
            console.log(`${await row.innerText()}`);
        }

        const nxtButton = page.locator("button[aria-label='Next']");
        const buttonAttribute : string | null = await nxtButton.getAttribute('class');
        
        //await page.waitForTimeout(1000);
        
        if (buttonAttribute?.includes('disabled')) {
            hasMorePage = false;
            break;
        } else {
           await nxtButton.click();
        }

    }
});

test("Handling Dynamic Table Listing data count",async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");    

    //4. Check the data displays based on the filter
    const dropdown:Locator = page.locator("#dt-length-0");
    await dropdown.selectOption('50');
    const rows:Locator[] = await page.locator("#example tbody tr").all();
    await page.waitForTimeout(5000);
    expect(rows.length).toBe(50);
});

test("Handling Dynamic Table - Filter the specific data on the table",async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");    

    //5. Filter the specific data on the table
    const searchArea = page.locator("#dt-search-0");
    await searchArea.fill("Vivian Harrell");

    await page.waitForTimeout(2000);
    const rows:Locator[] = await page.locator("#example tbody tr").all();
    const columns:Locator[] = await page.locator("#example tbody tr td").all();
    
    console.log("Length is", rows.length);

if (columns.length > 1) {
        let matchFound=false;
        for (const row of rows) {
            const txt = await row.innerText();
            if (txt.includes("Vivian Harrell")) {
                matchFound=true;
                console.log("Filtered Data Is Found");
                break;
            }
        }
        //expect(matchFound).toBe(true); //or
        expect(matchFound).toBeTruthy();
}else{
    console.log("NO DATA FOUND");
}
});
