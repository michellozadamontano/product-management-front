import {
    Component
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {routes} from '../../const';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    public routes: typeof routes = routes;

}
