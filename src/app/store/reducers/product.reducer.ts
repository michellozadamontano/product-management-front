import { Action }               from '@ngrx/store';
import { createReducer }        from '@ngrx/store';
import { on }                   from '@ngrx/store';
//-------------------------------------------------------------------------------------
import { IProductState }        from '../state/product.state';
import { initialProductState }  from '../state/product.state';
import * as action              from '../actions/product.action';

export const productReducer = createReducer(
  initialProductState,
  on(action.loadProducts, (state) => ({...state, loading: true})),
  on(action.loadProductsSuccess, (state, {data}) => ({...state, loading: false, products: data, error: null})),
  on(action.loadProductsFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(action.loadProduct, (state) => ({...state, loading: true})),
  on(action.loadProductSuccess, (state, {data}) => ({...state, loading: false, selectedProduct: data, error: null})),
  on(action.loadProductFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(action.createProduct, (state) => ({...state, loading: true})),
  on(action.createProductSuccess, (state, {data}) => ({...state, loading: false, error: null})),
  on(action.createProductFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(action.updateProduct, (state) => ({...state, loading: true})),
  on(action.updateProductSuccess, (state, {data}) => ({...state, loading: false, error: null})),
  on(action.updateProductFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(action.deleteProduct, (state) => ({...state, loading: true})),
  on(action.deleteProductSuccess, (state, {id}) => ({...state, loading: false, error: null})),
  on(action.deleteProductFailure, (state, {error}) => ({...state, loading: false, error: error}))
);
export function reducer(state: IProductState | undefined, action: Action) {
  return productReducer(state, action);
}
