import{test, expect, Locator} from '@playwright/test';

test("Verify the single select dropdown",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select option from the drop down (4 Ways)
    await page.locator("#country").selectOption("India")//Select By Visible Text
    await page.locator("#country").selectOption({value:"australia"})//Select By Value
    await page.locator("#country").selectOption({label:"Japan"})//Select By Label
    await page.locator("#country").selectOption({index:3})//Select By Visible Index
    


    //2. Check number of options in the dropdown(Count)
    const countryNames: Locator = page.locator("#country option");
    //await expect(countryNames).toHaveCount(10);

    //3. Check an option present on the drop down
    const countryNamesList:string[]= (await countryNames.allTextContents()).map(value => value.trim());
    expect(countryNamesList).toContain("India");
    
    //4. Print Country Names from that dropdown
    for (const element of countryNamesList) {
        console.log("Country Names are : ", element);
    }
    await page.waitForTimeout(5000);
});

test("Verify the multi select dropdown", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select option from the drop down (4 Ways)
    await page.locator('#colors').selectOption(['Red','Blue']);//Select By Visible Text
    await page.locator('#colors').selectOption(['green','yellow']);//Select By Value
    await page.locator('#colors').selectOption([{'label':'White'},{'label':'Green'}]);//Select By Label
    await page.locator('#colors').selectOption([{'index':1},{'index':3}]);//Select By Index

    //2. Check number of options in the dropdown(Count)
    const colorsDropdown:Locator = page.locator('#colors option');
    //await expect(colorsDropdown).toHaveCount(7);
    

    //3. Check an option present on the drop down
    const ColorsList:string[] = (await colorsDropdown.allTextContents()).map(value=>value.trim());
    expect(ColorsList).toContain("Red") 
            //or
    //expect((await colorsDropdown.allTextContents()).map(text=>text.trim())).toContain("hite");

    //4. Print Country Names from that dropdown
    for (const element of ColorsList) {
        console.log("Colors Names are : ", element);
    }
    await page.waitForTimeout(5000);
});

test("Verify sort() method without spread operator",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const coloursDropdown:Locator = page.locator('#colors option');
    const ColorsList:string[] = (await coloursDropdown.allTextContents()).map(value=>value.trim());

    //This is wrong while assign like this then the sorted value will be affected on the 'ColorsList'
    const originalList:String[] = ColorsList;
    const sortedList:String[] = ColorsList.sort();

    console.log("originalList is:" , originalList);
    console.log("sortedList is:" , sortedList);

})

test("Verify sort() method with spread operator",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const dropdown:Locator = page.locator('#colors option');
    //const dropdown:Locator = page.locator('#animals option');
    const dropdownValues:string[] = (await dropdown.allTextContents()).map(value=>value.trim());

    //This is wrong while assign like this then the sorted value will be affected on the 'ColorsList'
    const originalList:String[] = [...dropdownValues];
    const sortedList:String[] = dropdownValues.sort();

    console.log("originalList is:" , originalList);
    console.log("sortedList is:" , sortedList);

    expect(originalList).not.toEqual(sortedList) //--- for colors
    //expect(originalList).toEqual(sortedList);//--- for animal
    
    if (originalList === sortedList) {
        console.log("Dropdown is sorted order");
    } else {
        console.log("Dropdown is not sorted order");
    }
})

test("Verify the 'Colors' and 'animals' dropdown has duplicate value",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const dropdown:Locator = page.locator('#colors option');
    //const dropdown:Locator = page.locator('#animals option');
    const dropdownValues:string[] = (await dropdown.allTextContents()).map(value=>value.trim());

    const mySet = new Set<String>();
    const duplicates:String[]=[];
    for (const element of dropdownValues) {
        if (mySet.has(element)) {
            duplicates.push(element);
        } else {
            mySet.add(element);
        }
    }
    
    if (duplicates.length > 0) {
        console.log("Dropdown is duplicate values : ", duplicates);
    } else {
        console.log("Dropdown is not duplicate values : ", duplicates);
    }

    expect(duplicates.length).not.toBe(0);//--for color
   //expect(duplicates.length).toBe(0);//--for animal
})