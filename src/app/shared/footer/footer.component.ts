import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {routes} from '../../const';
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";


@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        RouterLink,
        MatButtonModule
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    public routes: typeof routes = routes;
}
