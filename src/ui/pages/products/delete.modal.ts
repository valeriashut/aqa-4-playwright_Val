import { SalesPortalPage } from "../salesPortal.page";

export class ProductDeleteModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator(".modal-content");

    readonly title = this.uniqueElement.locator("h5");
    readonly message = this.uniqueElement.locator("div.modal-body-text");
    readonly closeButton = this.uniqueElement.locator("button.btn-close");
    readonly deleteButton = this.uniqueElement.locator("button.btn-danger");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

    async clickCloseButton() {
        await this.closeButton.click();
    }

    async clickDeleteButton() {
        await this.deleteButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }
}