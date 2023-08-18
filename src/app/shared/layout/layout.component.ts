import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MediaMatcher} from "@angular/cdk/layout";
import {HeaderComponent} from "../header/header.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        HeaderComponent,
        SidebarComponent
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    @ViewChild('sidenav') sidenav: MatSidenav | undefined;
    public isShowSidebar: boolean;
    public mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 1024px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();


        this.isShowSidebar = !this.mobileQuery.matches;
    }
}
