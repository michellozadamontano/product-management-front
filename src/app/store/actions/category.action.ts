import { createAction }   from '@ngrx/store';
import { props }          from '@ngrx/store';
import {ICategory} from "../../models/category.interface";

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction('[Category] Load Categories Success', props<{ data: ICategory[] }>());
export const loadCategoriesFailure = createAction('[Category] Load Categories Failure', props<{ error: any }>());
export const loadCategory = createAction('[Category] Load Category', props<{ id: number }>());
export const loadCategorySuccess = createAction('[Category] Load Category Success', props<{ data: ICategory }>());
export const loadCategoryFailure = createAction('[Category] Load Category Failure', props<{ error: any }>());
export const createCategory = createAction('[Category] Create Category', props<{ data: ICategory }>());
export const createCategorySuccess = createAction('[Category] Create Category Success', props<{ data: ICategory }>());
export const createCategoryFailure = createAction('[Category] Create Category Failure', props<{ error: any }>());
export const updateCategory = createAction('[Category] Update Category', props<{ data: ICategory }>());
export const updateCategorySuccess = createAction('[Category] Update Category Success', props<{ data: any }>());
export const updateCategoryFailure = createAction('[Category] Update Category Failure', props<{ error: any }>());
export const deleteCategory = createAction('[Category] Delete Category', props<{ id: number }>());
export const deleteCategorySuccess = createAction('[Category] Delete Category Success', props<{ id: number }>());
export const deleteCategoryFailure = createAction('[Category] Delete Category Failure', props<{ error: any }>());
