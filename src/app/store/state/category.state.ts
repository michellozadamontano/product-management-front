import {ICategory} from "../../models/category.interface";

export interface ICategoryState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
  error: string | null;
  loading: boolean;
}

export const initialCategoryState: ICategoryState = {
  categories: [],
  selectedCategory: null,
  error: null,
  loading: false
}
