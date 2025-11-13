import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ID, IResponseFields } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}

export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}

//export type IProductInTable = Pick<IProduct, "name" | "manufacturer" | "price"> & { createdOn : string };
export interface IProductFromTable extends Omit<IProduct, 'amount' | 'notes'> {
  createdOn: string;
}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

// export interface IProductDetails extends Required<IProduct> {
//   createdOn : string;
// }

// {
//   name: string;
//   amount: number;
//   price: number;
//   manufacturer: MANUFACTURERS;
//   creatOn: string;
//   notes: string;
// }