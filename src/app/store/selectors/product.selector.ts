import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const productSelector = (state: IAppState) => state.products;

export const selectProducts = createSelector(productSelector, (state) => state.products);
export const selectSelectedProduct = createSelector(productSelector, (state) => state.selectedProduct);
export const selectProductError = createSelector(productSelector, (state) => state.error);
export const selectProductLoading = createSelector(productSelector, (state) => state.loading);
