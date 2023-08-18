import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        LayoutComponent,
        FooterComponent,
        RouterOutlet
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
