import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject, takeUntil } from "rxjs";
import { IProduct } from "../models/product.interface";
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import * as selector from '../store/selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = environment.apiUrl;
    private accessToken: string | null = localStorage.getItem('access_token');
    private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    private unsubscribe$ = new Subject<void>;

    constructor(
        private http: HttpClient,
        private store: Store<IAppState>
        ) {
        this.store.select(selector.selectUserAccessToken).pipe(takeUntil(this.unsubscribe$)).subscribe((token) => {
            this.accessToken = token;
            this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
        });
     }

    private buildUrl(endpoint: string): string {
        return `${this.apiUrl}/product/${endpoint}`;
    }

    private get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(this.buildUrl(endpoint), { headers: this.headers });
    }

    private post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(this.buildUrl(endpoint), data, { headers: this.headers });
    }

    private put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(this.buildUrl(endpoint), data, { headers: this.headers });
    }

    private delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(this.buildUrl(endpoint), { headers: this.headers });
    }

    getProducts(pageNumber: number, pageSize: number): Observable<IProduct[]> {
        return this.get<IProduct[]>(`all?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.get<IProduct>(`${id}`);
    }

    createProduct(product: IProduct): Observable<IProduct> {
        return this.post<IProduct>('create', product);
    }

    updateProduct(product: IProduct): Observable<any> {
        return this.put<any>(`update/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.delete<any>(`${id}`);
    }
}
