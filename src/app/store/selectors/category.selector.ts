import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const categorySelector = (state: IAppState) => state.categories;

export const selectCategories = createSelector(categorySelector, (state) => state.categories);
export const selectSelectedCategory = createSelector(categorySelector, (state) => state.selectedCategory);
export const selectCategoryError = createSelector(categorySelector, (state) => state.error);
export const selectCategoryLoading = createSelector(categorySelector, (state) => state.loading);
