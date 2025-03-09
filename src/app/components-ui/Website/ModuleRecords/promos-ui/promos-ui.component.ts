// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-promos-ui',
//   templateUrl: './promos-ui.component.html',
//   styleUrls: ['./promos-ui.component.css']
// })
// export class PromosUIComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';

@Component({
  selector: 'app-promos-ui',
  templateUrl: './promos-ui.component.html',
  styleUrls: ['./promos-ui.component.css']
})
export class PromosUIComponent implements OnInit {
  btnSave:string="Save";
  menuForm!: FormGroup;
  moduleName:any;

  constructor(  private fb: FormBuilder,
    public dialogRef: MatDialogRef<PromosUIComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationsService,private menuService:MenuService
  
  ) {
    this.moduleName = this.data.moduleName;
    //console.log(this.moduleName)
   
   
    this.menuForm = this.fb.group({
    home: ['', [Validators.required]],
    description: ['', [Validators.required]],

  });


}

  ngOnInit(): void {
  
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

}
