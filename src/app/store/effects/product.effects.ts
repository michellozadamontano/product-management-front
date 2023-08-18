import {Injectable} from '@angular/core';
//--------------------------------------------------------------------------------------
// Imports Section (Ngrx)
//--------------------------------------------------------------------------------------
import {Actions} from '@ngrx/effects';
import {createEffect} from '@ngrx/effects';
import {ofType} from '@ngrx/effects';
//--------------------------------------------------------------------------------------
// Imports Section (Rxjs)
//--------------------------------------------------------------------------------------
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
//--------------------------------------------------------------------------------------
// Imports Section (Services)
//--------------------------------------------------------------------------------------
import * as services from '../../services';
//--------------------------------------------------------------------------------------
// Imports Section (Actions)
//--------------------------------------------------------------------------------------
import * as actions from '../actions';


@Injectable()
export class ProductEffects {


    constructor(
        private actions$: Actions,
        private service$: services.ProductService
    ) {
    }

    //------------------------------------------------------------------------------------
    // Load Products
    //------------------------------------------------------------------------------------
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadProducts),
        switchMap((action) => this.service$.getProducts(action.pageNumber, action.pageSize)
            .pipe(
                map((products : any) => actions.loadProductsSuccess({data: products.data})),
                catchError(error => of(actions.loadProductsFailure({error})))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Load Product
    //------------------------------------------------------------------------------------
    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadProduct),
        mergeMap((action) => this.service$.getProduct(action.id)
            .pipe(
                map((product : any) => actions.loadProductSuccess({data: product.data})),
                catchError(error => of(actions.loadProductFailure({error})))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Create Product
    //------------------------------------------------------------------------------------
    createProduct$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createProduct),
        mergeMap((action) => this.service$.createProduct(action.data)
            .pipe(
                map(product => actions.createProductSuccess({data: product})),
                catchError(error => of(actions.createProductFailure({error})))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Update Product
    //------------------------------------------------------------------------------------
    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateProduct),
        mergeMap((action) => this.service$.updateProduct(action.data)
            .pipe(
                map(product => actions.updateProductSuccess({data: product})),
                catchError(error => of(actions.updateProductFailure({error})))
            )
        )
    ));

    //------------------------------------------------------------------------------------
    // Delete Product
    //------------------------------------------------------------------------------------
    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(actions.deleteProduct),
        mergeMap((action) => this.service$.deleteProduct(action.id)
            .pipe(
                map(() => actions.deleteProductSuccess({id: action.id})),
                catchError(error => of(actions.deleteProductFailure({error})))
            )
        )
    ));
}
