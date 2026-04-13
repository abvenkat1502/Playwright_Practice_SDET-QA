import{test,expect,Locator} from "@playwright/test";

test("Handling Dynamic Table",async({page})=>{

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    //1. Get Row Count
    const table:Locator = page.locator(".table.table-striped tbody");
    await expect(table).toBeVisible();

    const rows:Locator[] = await table.locator("tr").all();
    expect(rows).toHaveLength(4);


})