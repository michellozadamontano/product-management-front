import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManager } from 'oidc-client';
import { oidcConfig } from '../../../const/oidc-config';
import { Router, RouterModule } from '@angular/router';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import * as selector from '../../../store/selectors';
import * as actions from '../../../store/actions';
import { IUser } from 'src/app/models/user.interface';

@Component({
    selector: 'app-auth-callback',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
    public userManager = new UserManager(oidcConfig);

    constructor(
        private store: Store<IAppState>,
        private route: Router
    ) { }

    ngOnInit() {
        this.userManager.signinRedirectCallback().then((user) => {
            console.log(user);
            let userObj: IUser = {
                name: user.profile.name,
                profile: user.profile.profile,
            }
            this.store.dispatch(actions.loginAction({ user: userObj, access_token: user.access_token }));
            // save access_token in local storage
            localStorage.setItem('access_token', user.access_token);
            //redirect to home page
            this.route.navigate(['/']);
        });
    }
}
