import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routes} from '../../const';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";


@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, RouterLinkActive, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    public routes: typeof routes = routes;
    public isOpenUiElements = false;

    public openUiElements() {
        this.isOpenUiElements = !this.isOpenUiElements;
    }
}
