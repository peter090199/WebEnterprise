import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private toastr : ToastrService,
    private dialog: MatDialog,
  ) { }


  toastrSuccess(msg:any){
    this.toastr.success(msg);
  }
  toastrError(msg:any){
    this.toastr.error(msg);
  }

  toastrWarning(msg:any){
    this.toastr.warning(msg);
  }

  toastrInfo(msg:any){
    this.toastr.info(msg);
  }
  popupWarning(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            cancelButtonText: 'No'
          });
  }
  popup(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            cancelButtonText: 'No'
          });
  }

  popupWarning3Buttons(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            denyButtonText: 'Yes, Remove All'
          });
  }

  // popupWarningDiscard(title: string): Promise<string> {
  //   return Swal.fire({
  //     title: title, // Use the passed title
  //     text: 'Do you want to save the changes?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: 'No',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire('Saved!', '', 'success');
  //       this.refreshFormData(); // Trigger refresh after saving
  //       return 'confirmed'; // Return a value to indicate confirmation
  //     } else if (result.isDenied) {
  //       const dialogConfig = new MatDialogConfig();
  //       dialogConfig.width = '500px';
  //      // const dialogRef = this.dialog.open(AddEducationUIComponent, dialogConfig);

  //       dialogRef.afterClosed().subscribe(() => {
  //         // Ensure the form data is refreshed after the dialog is closed
  //         this.refreshFormData();
  //       });

  //       return 'denied'; // Return a value to indicate denial
  //     }

  //     return 'cancelled'; // Return if the action was cancelled
  //   });
  // }

  // Method to refresh form data
  // refreshFormData() {
  //   const education = this.dataService.getDataEducation();
  //   return education;
  // }

toastPopUp(msg:string){
  return Swal.fire({
    text: msg,
    icon: "success"
  });
}
toastPopUpError(msg:string){
  return Swal.fire({
    text: msg,
    icon: "warning",
    showCancelButton: false,
    confirmButtonText: 'OK',
    confirmButtonColor :'#3f51b5',
    cancelButtonColor :'#f44336',
    cancelButtonText: 'No',

  });
}

}
