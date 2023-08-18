import { CanActivateFn } from '@angular/router';
import { routes } from 'src/app/const';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {

    const toastr = inject(ToastrService);
    let access_token: string | null = localStorage.getItem('access_token');
    if (access_token) {
        return true;
    }

    toastr.error('You are not logged in');
    return false;
};
