import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject, takeUntil } from "rxjs";
import { ICategory } from "../models/category.interface";
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import * as selector from '../store/selectors';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

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


    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/category', { headers: this.headers });
    }

    getCategory(id: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/category/' + id);
    }

    createCategory(category: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/category', category, { headers: this.headers });

    }

    updateCategory(category: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + '/category/' + category.id, category, { headers: this.headers });
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + '/category/' + id, { headers: this.headers });
    }

}
