import { Component, OnInit } from '@angular/core';
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
    selector: 'app-category-edit',
    standalone: true,
    imports: [
        CommonModule,
        CategoryFormComponent],
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

    public categories$: Observable<any> = this.store.select(selector.selectCategories);
    public categoryId: number = this.route.snapshot.params['id'];
    public category$: Observable<any> = this.store.select(selector.selectSelectedCategory);
    public isErrorCreate$ = this.store.select(selector.selectCategoryError);

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
    ngOnInit(): void {
        this.store.dispatch(actions.loadCategory({ id: this.categoryId }));
    }

    //------------------------------------------------------------------------
    // Public Methods Section
    //------------------------------------------------------------------------
    public editCategory(category: ICategory): void {
        console.log('editCategory', category);
        if (category.parentId == 0) {
            category.parentId = null;
        }

        this.store.dispatch(actions.updateCategory({ data: category }));
        // if no error, redirect to list
        this.store.select(selector.selectCategoryError).subscribe((error: string | null) => {
            if (!error) {
                this.router.navigate(['/home/categories']);
            }
            else {
                this.toastr.error('There was an error editing category', 'Error');
            }
        });
    }
}
