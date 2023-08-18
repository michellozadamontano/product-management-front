import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const userSelector = (state: IAppState) => state.user;

export const selectUser = createSelector(userSelector, (state) => state.user);
export const selectUserError = createSelector(userSelector, (state) => state.error);
export const selectUserLogged = createSelector(userSelector, (state) => state.isLogged);
export const selectUserAccessToken = createSelector(userSelector, (state) => state.access_token);
