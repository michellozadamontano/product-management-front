import { createAction }   from '@ngrx/store';
import { props }          from '@ngrx/store';
import { IUser } from 'src/app/models/user.interface';

export const loginAction = createAction(
    '[App] Login',
    props<{ user: IUser }>()
);

export const LOGOUT         = '[App] Logout';
export const logoutAction   = createAction('[App] Logout');
