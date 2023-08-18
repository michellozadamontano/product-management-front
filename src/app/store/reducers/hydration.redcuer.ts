import {
    ActionReducer,
    INIT,
    UPDATE
}                               from "@ngrx/store";
//-------------------------------------------------------------------------------------
// Imports State
//-------------------------------------------------------------------------------------
import { IAppState }            from '../state/app.state';

export const hydrationMetaReducer = (
  reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
