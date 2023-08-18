import { CanActivateFn } from '@angular/router';
import { routes } from 'src/app/const';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(Store<IAppState>);
    const router = inject(Router);
    const isLogged = store.select(state => state.user.isLogged);
    if (!isLogged) {
        router.navigate([routes.DASHBOARD]);
        return false;
    }
  return true;
};
