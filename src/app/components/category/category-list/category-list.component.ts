import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    map,
    of,

} from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { routes } from 'src/app/const';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        RouterLink,
        NgIf,
        MatProgressSpinnerModule,
        MatButtonModule
    ],
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

    //------------------------------------------------------------------------
    // Private Fields Section
    //------------------------------------------------------------------------
    private unsubscribe$ = new Subject<void>;
    //------------------------------------------------------------------------
    // Public Properties Section
    //------------------------------------------------------------------------
    public categories$: Observable<any> = of([]);
    public loading$: Observable<boolean> = this.store.select(selector.selectCategoryLoading);
    public error$: Observable<string | null> = this.store.select(selector.selectCategoryError);
    public user$: Observable<any> = this.store.select(selector.selectUser);
    public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
    public routes: typeof routes = routes;

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
    ngOnInit() {
        this.onLoadData();
        this.categories$ = this.store.select(selector.selectCategories);
    }
    //------------------------------------------------------------------------
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    //------------------------------------------------------------------------
    ngAfterViewInit(): void {

    }
    //------------------------------------------------------------------------
    onLoadData() {
        this.store.dispatch(actions.loadCategories());
    }
    //------------------------------------------------------------------------
    onDelete(id: number) {
        this.store.dispatch(actions.deleteCategory({ id }));
    }
    //------------------------------------------------------------------------
    showSuccess() {
        this.toastr.success('Process complete!', 'Toastr fun!');
    }
    //------------------------------------------------------------------------
    isUser(): Observable<boolean> {
        return this.user$.pipe(
            map((user: any) => user.profile === 'user')
        );
    }
}
