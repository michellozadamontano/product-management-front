import { Action }               from '@ngrx/store';
import { createReducer }        from '@ngrx/store';
import { on }                   from '@ngrx/store';
import { ICategoryState}        from "../state/category.state";
import { initialCategoryState } from "../state/category.state";
import * as CategoryActions     from "../actions/category.action";


export const categoryReducer = createReducer(
  initialCategoryState,
  on(CategoryActions.loadCategories, (state) => ({...state, loading: true})),
  on(CategoryActions.loadCategoriesSuccess, (state, {data}) => ({...state, loading: false, categories: data})),
  on(CategoryActions.loadCategoriesFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(CategoryActions.loadCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.loadCategorySuccess, (state, {data}) => ({...state, loading: false, selectedCategory: data})),
  on(CategoryActions.loadCategoryFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(CategoryActions.createCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.createCategorySuccess, (state, {data}) => ({...state, loading: false, categories: [...state.categories, data]})),
  on(CategoryActions.createCategoryFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(CategoryActions.updateCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.updateCategorySuccess, (state, {data}) => ({...state, loading: false, categories: [...state.categories.filter(category => category.id !== data.id), data]})),
  on(CategoryActions.updateCategoryFailure, (state, {error}) => ({...state, loading: false, error: error})),
  on(CategoryActions.deleteCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.deleteCategorySuccess, (state, {id}) => ({...state, loading: false, categories: [...state.categories.filter(category => category.id !== id)]})),
  on(CategoryActions.deleteCategoryFailure, (state, {error}) => ({...state, loading: false, error: error}))
);
export function reducer(state: ICategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
}
