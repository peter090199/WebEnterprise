import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  RequiredRefresh: any;
  constructor(private http: HttpClient) { }
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Fetch the token from localStorage or other storage
  }
  private createParams(): HttpParams {
    return new HttpParams().set('desc_code', 'top_navigation');
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error for debugging
      return of(result as T);
    };
  }
  
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  uploadImages(formData:FormData): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}upload_images`, formData, { headers });
  }

  
  saveAndUpdate(formData:FormData): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}saveOrUpdateImages`, formData, { headers });
  }


  //update
  updateImages(formData:FormData): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${_url}updateImages`, formData, { headers });
  }

  //get
  getImages(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}get_images`, { headers});
  }
  
  //public
  getPublicImages(): Observable<any> {
    return this.http.get(`${_url}websitemodule/getImagesPublic`);
  }
  
  get_blogByPublic(): Observable<any> {
    return this.http.get(`${_url}websitemodule/get_blogByPublic`);
  }
  
  deleteImage(transCode: any) {
    const headers = this.createHeaders();
    return this.http.delete<{message(message: any): unknown; success: boolean }>(`${_url}deleteByTransCode/${transCode}`, {headers});
  }




  // uploadImagescc(files: File[],transNo:any,title:any, description:any, stats:any): Observable<any> {
  //   const formData = new FormData();
  //   files.forEach(file => {
  //     formData.append('files[]', file);
  //   });
  //   formData.append('transNo', transNo);
  //   formData.append('title', title);
  //   formData.append('description', description);
  //   formData.append('stats', stats);
  //   const headers = this.createHeaders();
  //   return this.http.post<any>(`${_url}upload_images`, formData, { headers });
  // }

  // uploadImagesx(files: File[], authToken: string,transNo:any,title:any, description:any): Observable<any> {
  //   const formData = new FormData();
  //   files.forEach(file => {
  //     formData.append('files[]', file);
  //   });
  //   formData.append('transNo', transNo);
  //   formData.append('title', title);
  //   formData.append('description', description);
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`,
  //     'Accept': 'application/json'
  //   });
  //   return this.http.post<any>(`${_url}upload_images`, formData, { headers });
  // }

  
  // getImagesxxx(): Observable<Blob[]> {
  //   const headers = this.createHeaders();
  //   return this.http.get<Blob[]>(`${_url}get_images`, { headers, responseType: 'blob' as 'json' });
  // }
 

  // getImages(): Observable<any> {
  //   const headers = this.createHeaders();
    
  //   return this.http.get<any>(`${_url}get_images`, { headers }).pipe(
  //     tap(res => {
  //       if (res.requiresRefresh) {
  //         location.reload(); // 🔄 Refresh the page if required
  //       }
  //     })
  //   );
  // }

}
