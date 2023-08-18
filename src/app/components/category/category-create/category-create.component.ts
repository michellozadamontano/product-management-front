import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import * as selector from '../../../store/selectors';
import * as actions from '../../../store/actions';
//------------------------------------------------------------------------
// Imports Section (Observable)
//------------------------------------------------------------------------
import {
    Observable,
    Subject,
    of,

} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/models/category.interface';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
    selector: 'app-category-create',
    standalone: true,
    imports: [
        CommonModule,
        CategoryFormComponent
    ],
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
    public categories$: Observable<any> = this.store.select(selector.selectCategories);

    //------------------------------------------------------------------------
    // Constructor Method Section
    //------------------------------------------------------------------------
    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService

    ) {
    }

    //------------------------------------------------------------------------
    // Public Methods Section
    //------------------------------------------------------------------------
    public createCategory(category: ICategory): void {
        console.log('createCategory', category);
        if (category.parentId == 0) {
            category.parentId = null;
        }

        this.store.dispatch(actions.createCategory({ data: category }));
        this.toastr.success('Category created successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
