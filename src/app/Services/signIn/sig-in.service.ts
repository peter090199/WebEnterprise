import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of } from 'rxjs';
import { _url } from 'src/global-variables';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigInService {
  private tokenKey = 'token';
  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }
  constructor(private http: HttpClient) { }
  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token to local storage
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
   // localStorage.setItem(this.role_code, token);
  }

  // Login method
  signin(username: any, password: any): Observable<any> {
    return this.http.post<any>(_url + 'loginUsername', { username, password }).pipe(
      tap(res => {
        if (res && res.token) {
          this.saveToken(res.token);
          this._refreshrequired.next();
          //this.startTokenExpirationCheck(); // Restart token expiration check on login
        }
      }),
      catchError(this.handleError())
    );
  }


  setActiveSignIn(email: any): Observable<any> {
  return this.http.post<any>(_url + 'accountactivation', { email }).pipe(
    tap(res => {
      if (res && res.token) {
        this.saveToken(res.token);
        this._refreshrequired.next();
        //this.startTokenExpirationCheck(); // Restart token expiration check on login
      }
    }),
    catchError(this.handleError())
  );
}

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }

  createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

  
}


