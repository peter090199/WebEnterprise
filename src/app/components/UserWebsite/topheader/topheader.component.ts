import { Component, HostListener, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;
  nav_module: any[] = []; // Explicitly set as an array
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private navigationService: MenuService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.getModule();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
    if (!this.isMobile) {
      this.isSidebarOpen = false; // Auto-close sidebar on larger screens
    }
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 767;
    if (!this.isMobile) {
      this.isSidebarOpen = false; // Ensure sidebar stays closed on larger screens
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  async getModule(): Promise<void> {
    this.isLoading = true; // Start loading indicator
    try {
      const response = await this.navigationService.getWebsiteMenu().toPromise();
      if (response?.success) {
        this.nav_module = response.data;
      } else {
        console.warn('Menu fetch unsuccessful:', response);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      this.isLoading = false; // Stop loading indicator
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
