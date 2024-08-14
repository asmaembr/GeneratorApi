import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Variable } from '../interfaces/Variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedIn } from '../interfaces/LoggedIn';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private apiUrl = `${environment.apiUrl}/Variable`;

  constructor(private http : HttpClient ) { }

  getVariables(user : LoggedIn): Observable<Variable[]> {
    return this.http.post<Variable[]>(this.apiUrl , user ,this.httpOptions());
  }

  getVariable(id: number): Observable<Variable> {
    return this.http.get<Variable>(`${this.apiUrl}/Form/${id}`);
  }

  saveVariable(variable: Variable): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Form', variable, this.httpOptions());
  }

  deleteVariable(id: number): Observable<any> {
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
