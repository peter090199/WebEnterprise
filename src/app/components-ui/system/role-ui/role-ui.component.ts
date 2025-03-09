import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { RolesService } from 'src/app/Services/Role/roles.service';

@Component({
  selector: 'app-role-ui',
  templateUrl: './role-ui.component.html',
  styleUrls: ['./role-ui.component.css']
})
export class RoleUIComponent implements OnInit {

  btnSave     : string = "Save";
  loading     : boolean = false;
  success : boolean = true;

  roleForm = new FormGroup({
              id      : new FormControl(0),
              rolecode    : new FormControl(''),
              description  : new FormControl(''),
             
  });
  
  constructor(
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<RoleUIComponent>,
    private notificationService   : NotificationsService,
    private roleService : RolesService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update
  ) { }

  ngOnInit(): void {
    if (this.data)
    {
      if(this.data.id)
        {
           this.btnSave = "Update";
          //this.roleForm.controls['empID'].disable();
           this.GetItemFormData();
        }
  
    }
   
  }

  GetItemFormData(){
    this.roleForm.controls['id'].setValue(this.data.id);
    this.roleForm.controls['rolecode'].setValue(this.data.rolecode);
    this.roleForm.controls['description'].setValue(this.data.description);
   
  }

  onClose() {
    // Logic to close the dialog or any other close action
    this.dialogRef.close(); // If using Angular Material Dialog
  }


  onSubmit(): void {
    if (this.roleForm.valid) {
     const role = this.roleForm.value;
      this.loading = true;
   
      if(this.btnSave === "Save") 
      {
        this.roleService.postData(role).subscribe({
          next: (res) => {
          if(res.success === true)
          {
            this.notificationService.toastrSuccess(res.message);
            this.ResetForm();
            this.loading = false;
          }
          else{
            this.notificationService.toastrError(res.message);
            this.loading = false; 
          }
          
          },
          error: (error) => {
            this.success = false;
            this.notificationService.toastrError(error.error);
            this.loading = false; 
            // Set loading to false in case of error
          },
        });
      }
      else if (this.btnSave === 'Update') {
        this.roleService.putData(this.data.id, role).subscribe({
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
    } else {
      // Optionally handle form invalid scenario
      this.notificationService.toastrError("Please fill in the required fields.");
    }
  }

  

  ResetForm(){
    this.roleForm.reset();
  }

}


