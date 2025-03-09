import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private authService:AuthService,private router:Router

  ){
       
  }
  onLogout(): void {
    this.authService.logout();
  }
  profile(): void {
    this.router.navigateByUrl('/account'); // Use this.router, not this.route
  }

}
