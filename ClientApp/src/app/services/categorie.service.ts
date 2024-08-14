import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categorie } from '../interfaces/Categorie';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environment.apiUrl}/Categorie`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

getCategorie(id: number): Observable<Categorie> {
  return this.http.get<Categorie>(`${this.apiUrl}/Form/${id}`);
}


saveCategorie(categorie: Categorie): Observable<any> {
      return this.http.post<any>(this.apiUrl + '/Form', categorie , this.httpOptions());
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete/${id}`);
  }

  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
  }
}
