import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    takeUntil,
    merge,
    of as observableOf

} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from 'src/app/models/product.interface';
import { routes } from 'src/app/const';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        RouterLink,
        NgIf,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatPaginatorModule
    ],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
    //------------------------------------------------------------------------
    // Private Fields Section
    //------------------------------------------------------------------------
    private unsubscribe$ = new Subject<void>;
    //------------------------------------------------------------------------
    // Public Properties Section
    //------------------------------------------------------------------------
    public loading$: Observable<boolean> = this.store.select(selector.selectProductLoading);
    public error$: Observable<string | null> = this.store.select(selector.selectProductError);
    public user$: Observable<any> = this.store.select(selector.selectUser);

    public displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'actions'];
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    @ViewChild(MatSort) sort: MatSort = new MatSort;

    public data: IProduct[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;

    public routes: typeof routes = routes;

    //------------------------------------------------------------------------
    // Constructor Method Section
    //------------------------------------------------------------------------
    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef

    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }
    ngAfterViewInit(): void {
        this.loadInitData();
    }

    //------------------------------------------------------------------------
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    //------------------------------------------------------------------------
    onDelete(id: number) {
        if (confirm('Are you sure to delete this record?')) {
            this.store.dispatch(actions.deleteProduct({ id }));
            this.toastr.warning('Deleted successfully', 'Product Deleted');
            this.cdr.detectChanges();
            this.loadInitData();
        }
    }

    //------------------------------------------------------------------------
    loadInitData() {
        // // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

        merge(this.sort!.sortChange, this.paginator!.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    this.loadData(this.paginator!.pageIndex + 1);
                    return this.store.select(selector.selectProducts);
                }),
                map((data) => {

                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = data === null;
                    this.resultsLength = data?.totalItems ?? 0;

                    return data?.result ?? [];
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe((data) => {
                this.data = data;
                this.cdr.detectChanges();
            });
    }

    //------------------------------------------------------------------------
    loadData(pageNumber: number = 1) {
        this.store.dispatch(actions.loadProducts({ pageNumber, pageSize: 5 }));
    }
    //------------------------------------------------------------------------
    isUser(): Observable<boolean> {
        return this.user$.pipe(
            map((user: any) => user.profile === 'user')
        );
    }
}
