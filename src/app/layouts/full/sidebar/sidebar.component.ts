import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { TNavigationService } from 'src/app/Services/SideBarMenu/tnavigation-service.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy,OnInit {
  mobileQuery: MediaQueryList;
  isLoading:boolean = false;
  success:boolean = false;
  nav_module:any=[];




  
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private sidebarServices:TNavigationService, private authService: AuthService,
  
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onLogout(): void {
    this.authService.logout();
  }
  // nav_module: any=[
  //   {
  //       "description": "Website",
  //       "icon": "-",
  //       "route": "module",
  //       "sort": 1,
  //       "submenus": [
  //           {
  //               "description": "Module",
  //               "icon": "-",
  //               "route": "module",
  //               "sort": 1
  //           },
  //           {
  //               "description": "Submodule",
  //               "icon": "1",
  //               "route": "submodule",
  //               "sort": 2
  //           },
  //           {
  //               "description": "Module Records",
  //               "icon": "-",
  //               "route": "module-records",
  //               "sort": 3
  //           }
  //       ]
  //   },
  //   {
  //       "description": "Dashboard",
  //       "icon": "-",
  //       "route": "home",
  //       "sort": 2,
  //       "submenus": []
  //   },
  //   {
  //       "description": "About Us",
  //       "icon": "-",
  //       "route": "about",
  //       "sort": 2,
  //       "submenus": []
  //   },
  //   {
  //       "description": "System",
  //       "icon": "icon-system",
  //       "route": "#",
  //       "sort": 3,
  //       "submenus": [
  //           {
  //               "description": "Security roles",
  //               "icon": "icon-security",
  //               "route": "security",
  //               "sort": 1
  //           },
  //           {
  //               "description": "Users",
  //               "icon": "icon-user",
  //               "route": "user",
  //               "sort": 2
  //           },
  //           {
  //               "description": "Menus",
  //               "icon": "icon-menu",
  //               "route": "menu",
  //               "sort": 3
  //           },
  //           {
  //               "description": "Roles",
  //               "icon": "icon-role",
  //               "route": "role",
  //               "sort": 4
  //           }
  //       ]
  //   },
  //   {
  //       "description": "Home",
  //       "icon": "-",
  //       "route": "home-website",
  //       "sort": 3,
  //       "submenus": []
  //   },
  //   {
  //       "description": "Contact Us",
  //       "icon": "-",
  //       "route": "contact-us",
  //       "sort": 3,
  //       "submenus": []
  //   },
  //   {
  //       "description": "Profile",
  //       "icon": "-",
  //       "route": "profile",
  //       "sort": 4,
  //       "submenus": [
  //           {
  //               "description": "User Account",
  //               "icon": "-",
  //               "route": "account",
  //               "sort": 1
  //           },
  //           {
  //               "description": "Settings",
  //               "icon": "-",
  //               "route": "settings",
  //               "sort": 2
  //           }
  //       ]
  //   },
  //   {
  //       "description": "Promos",
  //       "icon": "-",
  //       "route": "promos",
  //       "sort": 4,
  //       "submenus": []
  //   },
  //   {
  //       "description": "Blog",
  //       "icon": "-",
  //       "route": "blog",
  //       "sort": 5,
  //       "submenus": []
  //   }
  // ];


  ngOnInit() {
   this.getModule();
  }

  
  async getModule(): Promise<void> {
    this.isLoading = true;
    try {
      const res = await firstValueFrom(this.sidebarServices.getData());
      if (res) {
        this.success = true;
        this.nav_module = res;
      } else {
        this.success = false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  
}


