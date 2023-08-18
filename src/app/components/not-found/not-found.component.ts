import {
    Component
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";

import {routes} from '../../const';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        RouterLink,
        MatButtonModule

    ],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    public routes: typeof routes = routes;

}
