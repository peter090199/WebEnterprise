// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-menu-ui',
// //   templateUrl: './menu-ui.component.html',
// //   styleUrls: ['./menu-ui.component.css']
// // })
// // export class MenuUIComponent implements OnInit {

// //   constructor() { }

// //   ngOnInit(): void {
// //   }

// // }
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { NotificationsService } from 'src/app/Services/Global/notifications.service';
// import { RolesService } from 'src/app/Services/Role/roles.service';

// @Component({
//   selector: 'app-menu-ui',
//   templateUrl: './menu-ui.component.html',
//   styleUrls: ['./menu-ui.component.css']
// })
// export class MenuUIComponent implements OnInit {

//   btnSave     : string = "Save";
//   loading     : boolean = false;
//   success : boolean = true;

//   roleForm = new FormGroup({
//               id      : new FormControl(0),
//               rolecode    : new FormControl(''),
//               description  : new FormControl(''),
             
//   });
  
//   constructor(
//     private dialog            : MatDialog,
//     private dialogRef         : MatDialogRef<MenuUIComponent>,
//     private notificationService   : NotificationsService,
//     private roleService : RolesService,
//     @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update
//   ) { }

//   ngOnInit(): void {
//     if (this.data)
//     {
//       if(this.data.id)
//         {
//            this.btnSave = "Update";
//           //this.roleForm.controls['empID'].disable();
//            this.GetItemFormData();
//         }
  
//     }
   
//   }

//   GetItemFormData(){
//     this.roleForm.controls['id'].setValue(this.data.id);
//     this.roleForm.controls['rolecode'].setValue(this.data.rolecode);
//     this.roleForm.controls['description'].setValue(this.data.description);
   
//   }

//   onClose() {
//     // Logic to close the dialog or any other close action
//     this.dialogRef.close(); // If using Angular Material Dialog
//   }


//   onSubmit(): void {
//     if (this.roleForm.valid) {
//      const role = this.roleForm.value;
//       this.loading = true;
   
//       if(this.btnSave === "Save") 
//       {
//         this.roleService.postData(role).subscribe({
//           next: (res) => {
//           if(res.success === true)
//           {
//             this.notificationService.toastrSuccess(res.message);
//             this.ResetForm();
//             this.loading = false;
//           }
//           else{
//             this.notificationService.toastrError(res.message);
//             this.loading = false; 
//           }
          
//           },
//           error: (error) => {
//             this.success = false;
//             this.notificationService.toastrError(error.error);
//             this.loading = false; 
//             // Set loading to false in case of error
//           },
//         });
//       }
//       else if (this.btnSave === 'Update') {
//         this.roleService.putData(this.data.id, role).subscribe({
//           next: (res) => {
//             if(res.success === true)
//               {
//                 this.notificationService.toastrSuccess(res.message);
//                 this.ResetForm();
//                 this.loading = true;
//               }
//               else{
//                 this.notificationService.toastrWarning(res.message);
//                 this.loading = false; 
//               }
              
//           },
//           error: (err) => {
//             this.notificationService.toastrWarning(err.error);
//             this.loading = false;  // Set loading to false in case of error
//           },
//         });
//       }
//     } else {
//       // Optionally handle form invalid scenario
//       this.notificationService.toastrError("Please fill in the required fields.");
//     }
//   }

  

//   ResetForm(){
//     this.roleForm.reset();
//   }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';
@Component({
  selector: 'app-menu-ui',
  templateUrl: './menu-ui.component.html',
  styleUrls: ['./menu-ui.component.css']
})
export class MenuUIComponent implements OnInit {
  menuForm!: FormGroup;
  btnSave: string = 'Save';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MenuUIComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationsService,private menuService:MenuService
      ) {
        this.menuForm = this.fb.group({
          desc_code: ['top_navigation', [Validators.required]],
          description: ['', [Validators.required]],
          icon: ['-', [Validators.required]],
          class: ['-', [Validators.required]],
          routes: ['', [Validators.required]],
          sort: ['', [Validators.required, Validators.min(1)]],
          status: ['A', [Validators.required]], // Default to Active
          lines: this.fb.array([])  
        });
  }

  ngOnInit(): void {
    // const lines = this.menuForm.get('lines') as FormArray;
    // lines.push(this.createSubmenu());
   
    // If editing, change the button text
    if (this.data) {
      this.btnSave = 'Update';
    }
  }

  get lines(): FormArray {
    return this.menuForm.get('lines') as FormArray;
  }

  createSubmenu(): FormGroup {
    return this.fb.group({
      description: [''],
      icon: [''],
      class: [''],
      routes: [''],
      sort: ['', [Validators.min(1)]],
      status: [''] // Default to Active
    });
  }

  addSubmenu(): void {
    this.lines.push(this.createSubmenu());
  }

  removeSubmenu(index: number): void {
    if (this.lines.length > 1) {
      this.lines.removeAt(index);
    }
  }

  onSubmit(): void {
    // if (this.menuForm.valid) {
      const menuData = this.menuForm.value;
      console.log(menuData)
      // Call your service to send the form data to backend
      this.menuService.postData(menuData).subscribe(
        (response) => {
          if (response.success) {
            this.dialogRef.close(); // Close dialog if saved successfully
          }
        },
        (error) => {
          console.error('Error saving menu:', error);
        }
      );
   // }
  }


  onSubmitx(): void {
    if (this.menuForm.valid) {


      this.dialogRef.close(this.menuForm.value); 
    }
  }

  
  onSubmitxx(): void {
    if (this.menuForm.valid) {
    const menu = this.menuForm.getRawValue(); 
   //   this.loading = true;
   
      if(this.btnSave === "Save") 
      {
        this.menuService.postData(menu).subscribe({
          next: (res) => {
          if(res.success === true)
          {
            this.notificationService.toastrSuccess(res.message);
           // this.ResetForm();
          //  this.loading = false;
          }
          else{
            this.notificationService.toastrError(res.message);
          //  this.loading = false; 
          }
          
          },
          error: (error) => {
         //   this.success = false;
            this.notificationService.toastrError(error.error);
        //    this.loading = false; 
            // Set loading to false in case of error
          },
        });
      }
      // else if (this.btnSave === 'Update') {
      //   this.roleService.putData(this.data.id, role).subscribe({
      //     next: (res) => {
      //       if(res.success === true)
      //         {
      //           this.notificationService.toastrSuccess(res.message);
      //           this.ResetForm();
      //           this.loading = true;
      //         }
      //         else{
      //           this.notificationService.toastrWarning(res.message);
      //           this.loading = false; 
      //         }
              
      //     },
      //     error: (err) => {
      //       this.notificationService.toastrWarning(err.error);
      //       this.loading = false;  // Set loading to false in case of error
      //     },
      //   });
      // }
    } else {
      this.notificationService.toastrError("Please fill in the required fields.");
    }
  }

}


