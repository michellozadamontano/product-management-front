import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManager } from 'oidc-client';
import { oidcConfig } from '../../../const/oidc-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public userManager = new UserManager(oidcConfig);

    constructor() { }

    ngOnInit() {
        this.userManager.signinRedirect();
    }
}
