import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { environment } 			from '../../environments/environment';
import { Observable }           from "rxjs";
import { ICategory }            from "../models/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    getCategories(): Observable<ICategory[]> {
      return this.http.get<ICategory[]>(this.apiUrl + '/category');
    }

    getCategory(id: number): Observable<ICategory> {
      return this.http.get<ICategory>(this.apiUrl + '/category/' + id);
    }

    createCategory(category: ICategory): Observable<ICategory> {
      return this.http.post<ICategory>(this.apiUrl + '/category', category);
    }

    updateCategory(category: ICategory): Observable<any> {
      return this.http.put<any>(this.apiUrl + '/category/' + category.id, category);
    }

    deleteCategory(id: number): Observable<any> {
      return this.http.delete<any>(this.apiUrl + '/category/' + id);
    }

}
