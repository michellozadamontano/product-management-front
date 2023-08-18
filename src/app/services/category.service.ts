import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { ICategory } from "../models/category.interface";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiUrl = environment.apiUrl;
    private accessToken: string | null = localStorage.getItem('access_token');
    private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

    constructor(private http: HttpClient) { }


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
