import { createAction }   from '@ngrx/store';
import { props }          from '@ngrx/store';
import {IProduct, IProductResponse} from "../../models/product.interface";

export const loadProducts = createAction('[Product] Load Products', props<{ pageNumber: number, pageSize: number }>());
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ data: IProductResponse }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: any }>());
export const loadProduct = createAction('[Product] Load Product', props<{ id: number }>());
export const loadProductSuccess = createAction('[Product] Load Product Success', props<{ data: IProduct }>());
export const loadProductFailure = createAction('[Product] Load Product Failure', props<{ error: any }>());
export const createProduct = createAction('[Product] Create Product', props<{ data: IProduct }>());
export const createProductSuccess = createAction('[Product] Create Product Success', props<{ data: IProduct }>());
export const createProductFailure = createAction('[Product] Create Product Failure', props<{ error: any }>());
export const updateProduct = createAction('[Product] Update Product', props<{ data: IProduct }>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ data: IProduct }>());
export const updateProductFailure = createAction('[Product] Update Product Failure', props<{ error: any }>());
export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ id: number }>());
export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{ error: any }>());
