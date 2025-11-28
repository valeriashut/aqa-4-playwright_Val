import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class EditProductModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator("#edit-product-container");

    readonly title = this.uniqueElement.locator("h2");

    readonly nameInput = this.page.locator("#inputName");
    readonly manufacturerSelect = this.page.locator("#inputManufacturer");
    readonly priceInput = this.page.locator("#inputPrice");
    readonly amountInput = this.page.locator("#inputAmount");
    readonly notesInput = this.page.locator("#textareaNotes");
    readonly saveButton = this.page.locator("#save-product-changes"); 
    readonly deleteButton = this.page.locator("#delete-product-btn");

    async clickSaveChanges() {
        await this.saveButton.click();
    }

    async clickDeleteProduct() {
        await this.deleteButton.click();
    }

    async fillFormWithEdidData(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }
}