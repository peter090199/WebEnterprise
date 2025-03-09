import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
      window.location.reload(); // Force a full page reload
    });
  }
  
  
}
