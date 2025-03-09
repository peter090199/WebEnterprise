import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { SubMenuUIComponent } from 'src/app/components-ui/system/sub-menu-ui/sub-menu-ui.component';
import { ModuleTaskUIComponent } from 'src/app/components-ui/module-task-ui/module-task-ui.component';
import { ContactusUIComponent } from 'src/app/components-ui/Website/ModuleRecords/contactus-ui/contactus-ui.component';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search';
  isLoading: boolean = false;
  displayedColumns: string[] = ['id_module','fbpage','mLink','phoneNumber', 'description','updated_by','created_by','actions'];
  dataSource = new MatTableDataSource<any>([]);
  roles: any[] = [];
  pageSizeOptions   : number[] = [5, 10, 25, 100];
  success: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public dialog: MatDialog,
    private notificationsService:NotificationsService,
    private menuServices:MenuService,
  ) {}

  ngOnInit(): void {
      this.getData();
  
  }


  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }


 onClickNew(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '600px';

  const dialogRef = this.dialog.open(ModuleTaskUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getData(); // Refresh the table after dialog closure
    }
  });
}

selectedRow: any = null;

  onRowClick(row: any): void {
    this.selectedRow = row;
    console.log('Selected Row:', row);
  }
  onClickSubModule(): void {
    if (!this.selectedRow) {
      this.notificationsService.toastrWarning('Please Select a Menu.');
      return; // Prevent opening the dialog if no row is selected
    } 
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '600px';
      dialogConfig.data = { selectedRow: this.selectedRow }; // Pass the selected row data to the dialog
  
      const dialogRef = this.dialog.open(SubMenuUIComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getData(); // Refresh the table after dialog closure
        }
  
        // Reset selected row after dialog is closed
        this.selectedRow = null;
      });
    }
  }

  async getData(): Promise<void> {
    this.isLoading = true;
    try {
      const res = await firstValueFrom(this.menuServices.get_contactByRole());
  
      if (res?.data?.length) {
        this.dataSource.data = res.data;
        this.roles = res.data;
      } else {
        this.dataSource.data = []; // Ensure table is cleared if no data
      }
  
      // Ensure sorting works correctly (especially for date fields)
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'created_at' || property === 'updated_at') {
          return new Date(item[property]).getTime(); // Sort by date properly
        }
        return item[property];
      };
  
    } catch (error) {
      this.notificationsService.toastrError("Failed to fetch menu: " + (error || error));
    } finally {
      this.isLoading = false;
  
      // Ensure paginator and sort exist before assigning to avoid errors
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
  
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  

delete(role:any):void{
    this.notificationsService.popupWarning(role.contact_title," "+"Are you sure to delete this ").then((result) => {
      if (result.value) 
      {
        this.menuServices.delete_contact(role.transNo).subscribe({
            next:(res)=>{
              if(res.success === true)
                {
                  this.notificationsService.toastrSuccess(res.message);
                  this.isLoading = false;
                }
                else{
                  this.notificationsService.toastrError(res.message);
                  this.isLoading = false;
                }
                this.getData();
            },
            error:(error)=>{
              this.notificationsService.toastrError(error.error);
              this.isLoading = false;
            }

        });
      }


    });
  
}


edit(element: any): void {
  console.log(element)
  const dialogRef = this.dialog.open(ContactusUIComponent, {
    width: '600px',
    data: element || null
  
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getData();
    }
  });
}

}
