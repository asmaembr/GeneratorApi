import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../interfaces/LoginModel';
import { BehaviorSubject, catchError, NotFoundError, Observable, throwError } from 'rxjs';
import { LoggedIn } from '../interfaces/LoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  private userSource = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) { }

  login(login: LoginModel): Observable<LoggedIn>{
    return this.http.post<LoggedIn>(this.apiUrl+'/Login', login , this.httpOptions());
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.http.post<any>(this.apiUrl + '/Logout', this.httpOptions());
  }
  
  setUser(user: LoggedIn) {
    this.userSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  getUser(): LoggedIn | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
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
