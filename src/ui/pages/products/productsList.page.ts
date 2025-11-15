import { IProduct, IProductFromTable, IProductInTable } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ProductDetailModal } from "./details.modal";
import { ProductDeleteModal } from "./delete.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailModal(this.page);
  readonly deleteModal = new ProductDeleteModal(this.page);
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly tableRow = this.page.locator("tbody tr");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });
  
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  
  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  //readonly createdOnCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(3);

  readonly createdOnCell = (nameOrIndex: string | number) => 
    typeof nameOrIndex === "string" 
  ? this.tableRowByName(nameOrIndex).locator("td").nth(3)
  : this.tableRowByIndex(nameOrIndex).locator("td").nth(3);

  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");
  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getProductData(productName: string): Promise<IProductFromTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator('td').allInnerTexts();
    return {
      name: name!,
      price: +price!.replace('$', ''),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!
    }
  }

  // async getProductData(productName: string): Promise<IProductInTable> {
    //const productRow = this.tableRowByName(productName);

    //Option 1
    // return {
    //   name: await this.nameCell(productName).innerText(),
    //   price: +(await this.priceCell(productName).innerText()).replace("$", ""),
    //   manufacturer: (await this.priceCell(productName).innerText()) as MANUFACTURERS,
    //   createdOn: await this.priceCell(productName).innerText()
    // };

    //Option 2
    // const [name, price, manufacturer, createdOn] = await Promise.all([
    //   this.nameCell(productName).textContent(),
    //   this.priceCell(productName).textContent(),
    //   this.priceCell(productName).textContent(),
    //   this.priceCell(productName).textContent(),
    // ]);

    // return {
    //   name: name!,
    //   price: +price!.replace("$", ""),
    //   manufacturer: manufacturer! as MANUFACTURERS,
    //   createdOn: createdOn!,
    // };

    //Option 3
  //   const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator('td').allInnerTexts();
  //   return {
  //     name: name!,
  //     price: +price!.replace('$', ''),
  //     manufacturer: manufacturer! as MANUFACTURERS,
  //     createdOn: createdOn!,
  //   };
  // };

  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[]=[];

    const rows = await this.tableRow.all();
    for(const row of rows) {
      const[name, price, manufacturer, createdOn] = await row.locator('td').allInnerTexts();
      data.push({name: name!,
      price: +price!.replace('$', ''),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    });
  }
  return data;
}
}