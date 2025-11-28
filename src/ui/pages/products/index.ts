import { Page } from "@playwright/test";
import { AddNewProductPage } from "./addNewProduct.page";
import { ProductsListPage } from "./productsList.page";

export class AddNewProductUIService {
    addNewProductPage: AddNewProductPage;
    productsListPage: ProductsListPage;

    constructor(private page: Page) {
        this.addNewProductPage = new AddNewProductPage(page);
        this.productsListPage = new ProductsListPage(page);
    }
}