import { Injectable } from '@angular/core';
//--------------------------------------------------------------------------------------
// Imports Section (Ngrx)
//--------------------------------------------------------------------------------------
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
//--------------------------------------------------------------------------------------
// Imports Section (Rxjs)
//--------------------------------------------------------------------------------------
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//--------------------------------------------------------------------------------------
// Imports Section (Services)
//--------------------------------------------------------------------------------------
import * as services from '../../services';
//--------------------------------------------------------------------------------------
// Imports Section (Actions)
//--------------------------------------------------------------------------------------
import * as actions from '../actions';


@Injectable()
export class CategoryEffects {


    constructor(
        private actions$: Actions,
        private service$: services.CategoryService    ) {
    }

    //------------------------------------------------------------------------------------
    // Load Categories
    //------------------------------------------------------------------------------------
    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadCategories),
        switchMap(() => this.service$.getCategories()
            .pipe(
                map((categories: any) => actions.loadCategoriesSuccess({ data: categories.data })),
                catchError(error => of(actions.loadCategoriesFailure({ error })))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Load Category
    //------------------------------------------------------------------------------------
    loadCategory$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadCategory),
        mergeMap((action) => this.service$.getCategory(action.id)
            .pipe(
                map((category: any) => actions.loadCategorySuccess({ data: category['data'] })),
                catchError(error => of(actions.loadCategoryFailure({ error })))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Create Category
    //------------------------------------------------------------------------------------
    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createCategory),
        mergeMap((action) => this.service$.createCategory(action.data)
            .pipe(
                map(category => actions.createCategorySuccess({ data: category.data })),
                catchError(error => of(actions.createCategoryFailure({ error })))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Update Category
    //------------------------------------------------------------------------------------
    updateCategory$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateCategory),
        mergeMap((action) => this.service$.updateCategory(action.data)
            .pipe(
                map(() => actions.updateCategorySuccess({ data: action.data })),
                catchError(error => of(actions.updateCategoryFailure({ error })))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Delete Category
    //------------------------------------------------------------------------------------
    deleteCategory$ = createEffect(() => this.actions$.pipe(
        ofType(actions.deleteCategory),
        mergeMap((action) => this.service$.deleteCategory(action.id)
            .pipe(
                map(() => actions.deleteCategorySuccess({ id: action.id })),
                catchError(error => of(actions.deleteCategoryFailure({ error })))
            )
        )
    ));
}
