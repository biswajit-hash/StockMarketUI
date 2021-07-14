import { StockPrice } from "./StockPrice";

export interface StockLookupReponse {
    message?: string;
    stockDtos?:StockPrice[];
  }