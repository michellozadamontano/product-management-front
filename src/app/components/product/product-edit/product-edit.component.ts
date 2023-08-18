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
import { routes } from 'src/app/const';

@Component({
    selector: 'app-product-edit',
    standalone: true,
    imports: [CommonModule, ProductFormComponent, MatProgressSpinnerModule],
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
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

    public routes: typeof routes = routes;
    public productId: number = this.route.snapshot.params['id'];
    public product$: Observable<any> = this.store.select(selector.selectSelectedProduct);
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
        this.store.dispatch(actions.loadProduct({ id: this.productId }));
    }
    //------------------------------------------------------------------------
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    //------------------------------------------------------------------------
    // Public Methods Section
    //------------------------------------------------------------------------
    public editProduct(product: any): void {
        console.log('editProduct', product);
        this.store.dispatch(actions.updateProduct({ data: product }));
        this.isErrorCreate$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((error: any) => {
                if (error) {
                    this.toastr.error(error.message);
                }
                else {
                    this.toastr.success('Product updated successfully');
                    this.router.navigate([this.routes.PRODUCTS]);
                }
            });
    }
}
