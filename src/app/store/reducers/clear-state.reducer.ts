import {ActionReducer} from '@ngrx/store';
import {LOGOUT} from '../actions/user.action';
//-------------------------------------------------------------------------------------
// Imports State
//-------------------------------------------------------------------------------------
import {IAppState} from '../state/app.state';
//-------------------------------------------------------------------------------------
export const clearStateMetaReducer = (
    reducer: ActionReducer<IAppState>
  ): ActionReducer<IAppState> => {
    return (state, action) => {
      if (action.type === LOGOUT) {
        state = undefined;
      }
      // localStorage.setItem("state", JSON.stringify(nextState));
      return reducer(state, action);
    };
  };
