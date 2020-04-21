export interface StateSearch {
  query: string;
}

export interface StateResults {
  query: string;
  loading: boolean;
  results: ResultsModel;
  error: string;
}

export interface ResultsModel {
  author: Author;
  categories: string[];
  items: Item[];
}

interface Author {
  name: string;
  lastname: string;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity?: number;
  description?: string;
}

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface StateDetail {
  id: string;
  loading: boolean;
  categories?: string[];
  detail: Detail;
  error: string;
}

export interface Detail {
  author: Author;
  items: Item;
}
