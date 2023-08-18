import { Component, OnDestroy, OnInit } from '@angular/core';
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
    takeUntil,

} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-product-create',
    standalone: true,
    imports: [CommonModule, ProductFormComponent, MatProgressSpinnerModule],
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
    //------------------------------------------------------------------------
    // Private Fields Section
    //------------------------------------------------------------------------
    private unsubscribe$ = new Subject<void>;
    //------------------------------------------------------------------------
    // Public Properties Section
    //------------------------------------------------------------------------
    public categories$: Observable<any> = this.store.select(selector.selectCategories);
    public isErrorCreate$ = this.store.select(selector.selectProductError);
    public isLoading$ = this.store.select(selector.selectProductLoading);


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
    ngOnInit(): void {
        this.store.dispatch(actions.loadCategories());
    }
    //------------------------------------------------------------------------
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    //------------------------------------------------------------------------
    // Public Methods Section
    //------------------------------------------------------------------------
    public createProduct(product: any): void {
        this.store.dispatch(actions.createProduct({ data: product }));
        //if no error
        this.isErrorCreate$.pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
            if (!error) {
                this.toastr.success('Product created successfully');
                this.router.navigate(['../'], { relativeTo: this.route });
            }
            else {
                this.toastr.error('Error creating product', 'Error');
            }
        });
    }
}
