import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/Services/Security/security-roles.service';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface DialogData {
  menus_id: number;
  submenu: any[];
  id: number;
  rolecode: string;
}

@Component({
  selector: 'app-security-roles-ui',
  templateUrl: './security-roles-ui.component.html',
  styleUrls: ['./security-roles-ui.component.css']
})
export class SecurityRolesUIComponent implements OnInit {

  isLoading = false;
  role_code: string;
  securityRoles: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  response: any;
  menus_id: number | undefined;
  selectedMenus: any[] = []; 
  lines:any[] | undefined;

  constructor(
    private securityService: SecurityRolesService,
    private notificationService:NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.role_code = data.rolecode;
 
  }

  ngOnInit(): void {
    this.getSecurityRoles(this.role_code);
  }

  closeLoading(): void {
    this.loading = false;
  }

  getSecurityRoles(rolecode: string): void {
    this.loading = true;
    this.securityService.getSecurityRolesByDesc_Code(rolecode).subscribe(
      (datas: any) => {
        this.securityRoles = datas;
        console.log(this.securityRoles);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching security roles:', error);
        this.error = 'Failed to load security roles';
        this.loading = false;
      }
    );
  }

  toggleSubMenu(menu: any): void {
    menu.expanded = !menu.expanded;
  }

  onCheckboxChange2(item: any, submenu: any, event: any): void {
    // Initialize selectedMenus if not already defined
    this.selectedMenus ??= [];
  
    const submenusId = submenu?.submenus_id;
    const menuIndex = this.selectedMenus.findIndex(menu => menu.menus_id === item.menus_id);
  
    if (event.checked) {
      // Add new menu if it doesn't exist
      if (menuIndex === -1) {
        this.selectedMenus.push({
          rolecode: this.role_code,
          menus_id: item.menus_id,
          lines: submenusId ? [{ submenus_id: submenusId }] : []
        });
      } else if (submenusId) {
        // Update existing menu with new submenus_id if not already present
        const menu = this.selectedMenus[menuIndex];
        if (!menu.lines.some((line: { submenus_id: any; }) => line.submenus_id === submenusId)) {
          menu.lines.push({ submenus_id: submenusId });
        }
      }
    } else {
      // Remove submenus_id if unchecked
      if (menuIndex !== -1) {
        const menu = this.selectedMenus[menuIndex];
        menu.lines = menu.lines.filter((line: { submenus_id: any; }) => line.submenus_id !== submenusId);
  
        // Remove menu entry if lines array is empty
        if (menu.lines.length === 0) {
          this.selectedMenus.splice(menuIndex, 1);
        }
      }
    }
  
    console.log("selectedMenus:", this.selectedMenus);
  }
  

  submitData(): void {
    console.log("Submitted Data:", this.selectedMenus);
    const header = {
      header: this.selectedMenus
    };
   //console.log(header)
    this.securityService.submitData(header).subscribe({
      next: (res) => {
         if(res.success)
          {
            this.loading = true;
            this.notificationService.toastrSuccess(res.message);
            this.loading = false;

          }
          else{
           this.notificationService.toastrError(res.message);
            this.loading = false; 
          }
     
      },
      error: (err) => {
        this.loading = false;
        this.error = 'There was an error submitting the form. Please try again.';
        this.notificationService.toastrError(this.error);
      }
   });
  }
  

//   submitData(): void {
//     const formData = this.securityRoles.map(role => ({
//       rolecode: this.role_code,  
//       menus_id: this.selectedMenus.length > 0 ? this.selectedMenus[0] : null, 
//       lines: role.submenu || []  
//     }));

//     if (this.selectedMenus.length > 0) {
//       // Prepare the data you want to save, in this case, it's the selected menu IDs
//       const dataToSave = {
//         selectedMenus: this.selectedMenus
//       };
//     }
  
//     console.log('Form submitted with data:', formData);
    
//   //   this.loading = true;
//   //   this.securityService.submitData(formData).subscribe({
//   //     next: (res) => {
//   //        if(res.success)
//   //         {
//   //           this.notificationService.toastrSuccess(res.message);
//   //         //  this.ResetForm();
//   //           this.loading = false;

//   //         }
//   //         else{
//   //          this.notificationService.toastrError(res.message);
//   //           this.loading = false; 
//   //         }
     
//   //     },
//   //     error: (err) => {
//   //       this.loading = false;
//   //       this.error = 'There was an error submitting the form. Please try again.';
//   //       this.notificationService.toastrError(this.error);
//   //     }
//   //  });
//   }
// }

  // private prepareFormData(): any {
  //   // Prepare the data to be submitted with rolecode, menus_id, and lines
  //   // const data = {
  //   //   roles: this.securityRoles.map(role => ({
  //   //     rolecode: this.role_code,  // Ensure rolecode is included
  //   //     menus_id: 1,   // Ensure menus_id is included
  //   //     lines: role.lines || []    // Ensure lines is included (default to empty array if undefined)
  //   //   }))
  //   // };


  //   return data;
  // }
}
