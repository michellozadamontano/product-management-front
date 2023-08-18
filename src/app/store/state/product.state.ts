import {IProduct, IProductResponse} from "../../models/product.interface";

export interface IProductState {
  products: IProductResponse | null;
  selectedProduct: IProduct | null;
  error: string | null;
  loading: boolean;
}

export const initialProductState: IProductState = {
  products: null,
  selectedProduct: null,
  error: null,
  loading: false
}
