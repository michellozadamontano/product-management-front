import {
    Action,
    ActionReducer
}                   from '@ngrx/store';
import { LOGOUT }   from '../actions/user.actions';
//-------------------------------------------------------------------------------------
// Imports State
//-------------------------------------------------------------------------------------
import { IAppState } from '../state/app.state';
//-------------------------------------------------------------------------------------
export const clearStateMetaReducer = (
    reducer: ActionReducer<IAppState>
  ): ActionReducer<IAppState> => {
    return (state, action) => {
      if (action.type === LOGOUT) {
        state = undefined;
      }
      const nextState = reducer(state, action);
     // localStorage.setItem("state", JSON.stringify(nextState));
      return nextState;
    };
  };
