import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';
@Component({
  selector: 'app-module-ui',
  templateUrl: './module-ui.component.html',
  styleUrls: ['./module-ui.component.css']
})
export class ModuleUIComponent implements OnInit {
  menuForm!: FormGroup;
  btnSave: string = 'Save';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModuleUIComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationsService,private menuService:MenuService
      ) {
        this.menuForm = this.fb.group({
          module: ['', [Validators.required]],
          routes: ['', [Validators.required]],
          sort: ['', [Validators.required, Validators.min(1)]],
          status: ['', [Validators.required]], // Default to Active
        });
  }

  ngOnInit(): void {

    if (this.data != null)
      {
        if(this.data.transNo)
          {
             this.btnSave = "Update";
             this.GetItemFormData();
          }
    
      }
  }

  
  GetItemFormData(){
    this.menuForm.controls['module'].setValue(this.data.module);
    this.menuForm.controls['routes'].setValue(this.data.routes);
    this.menuForm.controls['sort'].setValue(this.data.sort);
    this.menuForm.controls['status'].setValue(this.data.status);
   
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

  loading:boolean = false;
  onSubmit(): void {
     if (this.menuForm.valid) {
      const menuData = this.menuForm.value;
      this.loading = true;
       if(this.btnSave === "Save") 
        {
          console.log(menuData)
          this.menuService.postWebsiteMenu(menuData).subscribe(
            (response) => {
              if (response.success == true) {
                this.notificationService.toastrSuccess(response.message);
                this.loading = false;
                this.ResetForm();
              }
              else
              {
                this.notificationService.toastrSuccess(response.message);
                this.loading = false;
              }
            },
            (error) => {
              console.error('Error saving menu:', error);
            }

            
          );
        }
        else if (this.btnSave === 'Update') {
          this.menuService.editWebsiteMenu(this.data.transNo, menuData ).subscribe({
            next: (res) => {
              if(res.success === true)
                {
                  this.notificationService.toastrSuccess(res.message);
                  this.ResetForm();
                  this.loading = true;
                }
                else{
                  this.notificationService.toastrWarning(res.message);
                  this.loading = false; 
                }
                
            },
            error: (err) => {
              this.notificationService.toastrWarning(err.error);
              this.loading = false;  // Set loading to false in case of error
            },
          });
        }
    }
  }

  ResetForm(){
    this.menuForm.reset();
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


