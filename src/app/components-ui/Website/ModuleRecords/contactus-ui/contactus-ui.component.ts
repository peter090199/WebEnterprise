import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';
@Component({
  selector: 'app-contactus-ui',
  templateUrl: './contactus-ui.component.html',
  styleUrls: ['./contactus-ui.component.css']
})
export class ContactusUIComponent implements OnInit {
  btnSave:string="Save";
  menuForm!: FormGroup;
  moduleName:any;
  transNo:any;

  constructor(  private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactusUIComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationsService,private menuService:MenuService
  
  ) {
    this.moduleName = this.data.moduleName;
    this.transNo = this.data.transNo;

         
    this.menuForm = this.fb.group({
      transNo: this.transNo,
      contact_title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fbpage:['', [Validators.required]],
      mLink:['',Validators.pattern(/^https:\/\/www\.messenger\.com\/t\/\d+\/?$/)],
      phoneNumber:['', [Validators.required]]
  
    });
    
}


getMessengerError(): string {
  const control = this.menuForm.get('mLink');
  if (control?.hasError('required')) {
    return 'Messenger link is required';
  }
  if (control?.hasError('pattern')) {
    return 'Invalid Messenger link format';
  }
  return '';
}

  ngOnInit(): void {
    if(this.data.id)
      {
          this.btnSave = "Update";
          this.GetItemFormData();
      }
  }

  GetItemFormData(){
    this.menuForm.controls['transNo'].setValue(this.data.transNo);
    this.menuForm.controls['contact_title'].setValue(this.data.contact_title);
    this.menuForm.controls['description'].setValue(this.data.description);
    this.menuForm.controls['fbpage'].setValue(this.data.fbpage);
    this.menuForm.controls['mLink'].setValue(this.data.mLink);
    this.menuForm.controls['phoneNumber'].setValue(this.data.phoneNumber);
  }

  loading:boolean = false;
  onSubmit(): void {
     if (this.menuForm.valid) {
      const menuData = this.menuForm.value;
      this.loading = true;
       if(this.btnSave === "Save") 
        {
          this.menuService.post_contact(menuData).subscribe(
            (response) => {
              if (response.success === true) {
                this.notificationService.toastrSuccess(response.message);
                this.loading = false;
                this.ResetForm();
              }
              if (response.success === false)
              {
                this.notificationService.toastrWarning(response.message);
                this.loading = false;
              }
             
            },
            (error) => {
              console.error('Error saving menu:', error);
            }

            
          );
        }
        
        else if (this.btnSave === 'Update') {
          this.menuService.update_contact(this.data.transNo, menuData ).subscribe({
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
