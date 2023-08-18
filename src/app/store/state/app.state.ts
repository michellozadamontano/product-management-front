import * as fromCategory from './category.state';
import * as fromProduct from './product.state';
import * as formUser from './user.state';

/**
 * The IAppState interface defines the structure of the application state.
 */
export interface IAppState {
    categories: fromCategory.ICategoryState;
    products: fromProduct.IProductState;
    user: formUser.IUserState;
}

/**
 * The initialAppState constant defines the initial state of the application.
 */
export const initialAppState: IAppState = {
    categories: fromCategory.initialCategoryState,
    products: fromProduct.initialProductState,
    user: formUser.initialUserState
}

export function getInitialState(): IAppState {
    return initialAppState;
}
