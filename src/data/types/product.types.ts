import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ID, IResponseFields, SortOrder } from "./core.types";

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

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export type ProductsTableHeader = "Name" | "Price" | "Manufacturer" | "Created On";

// export interface IHomePageMetrics extends IResponseFields {
//   Metrics:{
//     "orders": {
//       totalRevenue: number;
//       totalOrders: number;
//       averageOrderValue: number;
//       totalCanceledOrders: number;
//       recentOrders: any[];   
//       ordersCountPerDay: any[];
//     },
//     "customers": {
//       totalNewCustomers: number;
//       topCustomers: any[];
//       customerGrowth:any[];
//   },
//   "products": {
//     topProducts: any[];
//   }
// }
// }

// // export interface IHomePageMetrics extends Required<IResponseFields> {
// //   Metrics: {
// //     orders: IOrdersMetrics;
// //     customers: ICustomersMetrics;
// //     products: IProductsMetrics; 
// //   }
// // }

// // export interface IHomePageMetrics extends IResponseFields {
// //   Metrics:{
// //     "orders": {
// //       totalRevenue: number;
// //       totalOrders: number;
// //       averageOrderValue: number;
// //       totalCanceledOrders: number;
// //       recentOrders: any[];   
// //       ordersCountPerDay: any[];
// //     },
// //     "customers": {
// //       totalNewCustomers: number;
// //       topCustomers: any[];
// //       customerGrowth: [{
// //         date: {
// //         year: number;
// //         month: number;
// //         day: number;
// //       }
// //       count: number;
// //     }];
// //   },
// //   "products": {
// //     topProducts: any[];
// //   }
// // }
// // }
// //         "products": {
// //             "topProducts": []
// //         }
// //     }

// export interface IOrdersMetrics {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   totalCanceledOrders: number;
//   recentOrders: [];    
//   ordersCountPerDay: [];
  
//   // orders: {
//   //   totalRevenue: number;
//   //   totalOrders: number;
//   //   averageOrderValue: number;
//   //   totalCanceledOrders: number;
//   //   recentOrders: [];    
//   //   ordersCountPerDay: [];
//   // };
// }

// export interface ICustomersMetrics {
//     totalNewCustomers: number;
//     topCustomers: [];
//     customerGrowth: [{
//       date: {
//         year: number;
//         month: number;
//         day: number;
//       }
//       count: number;
//     }];
//   };
//   // customers: {
//   //   totalNewCustomers: number;
//   //   topCustomers: [];
//   //   customerGrowth: [{
//   //     date: {
//   //       year: number;
//   //       month: number;
//   //       day: number;
//   //     }
//   //     count: number;
//   //   }];
//   // };
// //}

//   export interface IProductsMetrics {
//     topProducts: [];
//   // products: {
//   //   topProducts: [];
//   // };
// }


// // "IsSuccess": true,
// //     "Metrics": {
// //         "orders": {
// //             "totalRevenue": 3,
// //             "totalOrders": 2,
// //             "averageOrderValue": 4,
// //             "totalCanceledOrders": 3,
// //             "recentOrders": [],
// //             "ordersCountPerDay": []
// //         },
// //         "customers": {
// //             "totalNewCustomers": 0,
// //             "topCustomers": [],
// //             "customerGrowth": [
// //                 {
// //                     "date": {
// //                         "year": 2025,
// //                         "month": 11,
// //                         "day": 5
// //                     },
// //                     "count": 0
// //                 }
// //             ]
// //         },
// //         "products": {
// //             "topProducts": []
// //         }
// //     },
// //     "ErrorMessage": null
// // }

// // export interface IProductDetails extends Required<IProduct> {
// //   createdOn : string;
// // }

// // {
// //   name: string;
// //   amount: number;
// //   price: number;
// //   manufacturer: MANUFACTURERS;
// //   creatOn: string;
// //   notes: string;
// // }