// order.model.ts
export interface Order {
    id?: number;
    itemNo: number;
    customerID: number;
    quantity: number;
    price: number;
    total: number;
    date: string; // Format: YYYY-MM-DD HH:MM:SS
  }
  