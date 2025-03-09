import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
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


  //taskwebsite

  //blog
  post_blog(menu: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}post_blog`, menu,{headers});
  }
  uploadImages(formData: FormData): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}upload_images`, formData,{headers});
  }


  get_images(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}get_images`,{headers});
  }

  get_blogByRole(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}websitemodule/get_blogByPublic`,{headers});
  }
  update_blog(transNo: number, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${_url}update_blog/${transNo}`, data, { headers });
  }

  delete_blog(transNo: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete<any>(`${_url}delete_blog/${transNo}`,{headers});
  }

  //about
  post(menu: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}post`, menu,{headers});
  }
  get(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}get`,{headers});
  }
  delete(transNo: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete<any>(`${_url}delete/${transNo}`,{headers});
  }

  update_about(transNo: number, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${_url}update_about/${transNo}`, data, { headers });
  }

  //contact
  post_contact(menu: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}post_contact`, menu,{headers});
  }

  get_contactByRole(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}get_contactByRole`,{headers});
  }
  update_contact(transNo: number, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${_url}update_contact/${transNo}`, data, { headers });
  }


  delete_contact(transNo: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete<any>(`${_url}delete_contact/${transNo}`,{headers});
  }


  submitMenu(formData: FormData): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${_url}module`, formData, { headers });
  }
  submitMenus(menu: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}module`, menu, { headers });
  }
  // Example of a GET request
  getMenu(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}menu`, { headers });
  }


  postData(menu: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}menu`, menu, { headers });
  }


  getAbout(): Observable<any> {
    return this.http.get(`${_url}websitemodule/getAbout`);
  }

  
  get_contact(): Observable<any> {
    return this.http.get(`${_url}websitemodule/get_contact`);
  }

  getWebsiteMenu(): Observable<any> {
    return this.http.get(`${_url}websitemodule/all`);
  }

  getWebsiteMenuByTask(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}getAllModules`,{headers});
  }


  getWebsiteModule(): Observable<any> {
    return this.http.get(`${_url}websitemodule/allModules`);
  }


  postWebsiteMenu(menu: any): Observable<any> {
    return this.http.post<any>(`${_url}websitemodule/create`, menu);
  }

  deleteWebsiteMenu(transNo: number): Observable<any> {
    return this.http.delete<any>(`${_url}websitemodule/delete/${transNo}`);
  }
  
  editWebsiteMenu(transNo: number, menu: any): Observable<any> {
    return this.http.put<any>(`${_url}websitemodule/edit/${transNo}`, menu);
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
