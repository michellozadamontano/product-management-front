import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from "@angular/material/badge";
import { Router, RouterLink } from '@angular/router';
import { UserManager } from 'oidc-client';
import { oidcConfig } from '../../const/oidc-config';

//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import * as selector from '../../store/selectors';
import * as actions from '../../store/actions';
import { IUser } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';




@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        MatBadgeModule,
        RouterLink
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() isMenuOpened: boolean = false;
    @Output() isShowSidebar = new EventEmitter<boolean>();

    public isLogged$: Observable<boolean> = this.store.select(selector.selectUserLogged);
    public user$: Observable<IUser | null> = this.store.select(selector.selectUser);
    public userManager = new UserManager(oidcConfig);



    constructor(
        private store: Store<IAppState>,
        private route: Router,
    ) { }

    public openMenu(): void {
        this.isMenuOpened = !this.isMenuOpened;

        this.isShowSidebar.emit(this.isMenuOpened);
    }

    public login(): void {
        this.userManager.signinRedirect();
    }

    public signOut(): void {
        this.store.dispatch(actions.logoutAction());
        localStorage.removeItem('access_token');
        this.logout();
        this.route.navigate(['/']);
    }
    async logout() {
        await this.userManager.signoutRedirect();
    }
}
