import { ActionReducerMap }         from '@ngrx/store';
import { InjectionToken }           from '@angular/core';
import { Action }                   from '@ngrx/store';
import { MetaReducer }              from '@ngrx/store';
import { IAppState}                 from "../state/app.state";
import { categoryReducer}           from "./category.reducer";
import { productReducer}            from "./product.reducer";
import { userReducer}               from "./user.reducer";
import { hydrationMetaReducer }     from "./hydration.redcuer";
import { clearStateMetaReducer }    from "./clear-state.reducer";



export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<IAppState, Action>
>('Root reducers token', {
  factory: () => ({
      categories: categoryReducer,
      products: productReducer,
      user: userReducer
  }),
});
export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer,
    clearStateMetaReducer
]
