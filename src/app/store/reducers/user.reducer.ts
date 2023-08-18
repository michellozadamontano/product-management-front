import { Action } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
//-------------------------------------------------------------------------------------
import { IUserState } from '../state/user.state';
import { initialUserState } from '../state/user.state';
import * as action from '../actions/user.action';

export const userReducer = createReducer(
    initialUserState,
    on(action.loginAction, (state, {user, access_token}) => ({ ...state, user: user, access_token, error: null, isLogged: true })),
);

export function reducer(state: IUserState | undefined, action: Action) {
    return userReducer(state, action);
}
