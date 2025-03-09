// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SubMenuService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {
  RequiredRefresh: any;

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) { }

  // Method to get the authentication token from localStorage or another method
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Fetch the token from localStorage or other storage
  }

  // Method to create HTTP headers with the Bearer token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Method to create HTTP params with the desc_code
  private createParams(): HttpParams {
    return new HttpParams().set('desc_code', 'top_navigation');
  }

  // Example of a GET request
  getSubMenu(transNo: any): Observable<any> {
    const headers = this.createHeaders();  // Assuming createHeaders() is a function that returns headers
    return this.http.get<any>(`${_url}menu/submenus/${transNo}`, { headers });
  }

  saveSubmenu(transNo: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}menu/submenus`, transNo, { headers });
  }

  postData(role: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}role`, role, { headers });
  }

  // Example of a PUT request
  putData(id: string, body: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${_url}role/${id}`, body, { headers });
  }

  // Example of a DELETE request
  deleteMenu(transNo: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${_url}menu/delete/${transNo}`, { headers });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error for debugging
      
      // Optionally, you can use toastr to show the error message here:
      // this.toastrService.error(error.message || 'An error occurred');

      // Let the app keep running by returning a safe result.
      return of(result as T);
    };
  }

}
