import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { CustomersApi } from "api/api/customer.api";


export class CustomerApiService {
  constructor(private customerApi: CustomersApi) {}

  async delete(token: string, id: string) {
    const response = await this.customerApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}