import { Component, HostListener, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})

export class TopheaderComponent implements OnInit {
  isSidebarOpen = false; 
  isMobile = false; 
  nav_module: any = [];
  isLoading:boolean=false;

  constructor(
    private authService: AuthService,
    private navigationService: MenuService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.getModule();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
    if (!this.isMobile) {
      this.isSidebarOpen = false; // Auto-close on larger screens
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 767;
    this.isSidebarOpen = false; // Default: closed on mobile
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  async getModule(): Promise<void> {
    try {
      const response = await this.navigationService.getWebsiteMenu().toPromise();
      if (response.success) {
        this.nav_module = response.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
