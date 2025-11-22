import { IResponseFields } from "./core.types";

export interface IHomePageMetrics extends IResponseFields {
    Metrics: IMetrics;
}

export interface IMetrics {
  orders: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCanceledOrders: number;
    recentOrders: [];
    ordersCountPerDay: [];
  };
  customers: {
    totalNewCustomers: number;
    topCustomers: [];
    customerGrowth: [];
  };
  products: {
    topProducts: [];
  };
}

// export interface IMetrics {
//   orders: IOrdersMetrics;
//   customers: ICustomersMetrics;
//   products: IProductsMetrics;
// }

// export interface IOrdersMetrics {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   totalCanceledOrders: number;
//   recentOrders: [];    
//   ordersCountPerDay: [];
// }

// export interface ICustomersMetrics {
//     totalNewCustomers: number;
//     topCustomers: [];
//     customerGrowth: [];
//   };

//    export interface IProductsMetrics {
//     topProducts: [];
//   };
