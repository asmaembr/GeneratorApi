import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedIn } from '../interfaces/LoggedIn';
import { Modele } from 'src/app/interfaces/Modele';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  private apiUrl = `${environment.apiUrl}/Modele`;

  constructor(private http : HttpClient ) { }

  getModeles(user : LoggedIn): Observable<Modele[]> {
    return this.http.post<Modele[]>(this.apiUrl , user ,this.httpOptions());
  }

  getModele(id: number): Observable<Modele> {
    return this.http.get<Modele>(`${this.apiUrl}/Form/${id}`);
  }

  saveModele(modele: Modele): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/FormVar', modele, this.httpOptions());
  }

  deleteModele(id: number): Observable<any> {
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
