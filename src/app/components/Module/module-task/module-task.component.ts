import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { MenuUIComponent } from 'src/app/components-ui/system/menu-ui/menu-ui.component';
import { SubMenuUIComponent } from 'src/app/components-ui/system/sub-menu-ui/sub-menu-ui.component';
import { ModuleUIComponent } from 'src/app/components-ui/module-ui/module-ui.component';
import { ModuleTaskUIComponent } from 'src/app/components-ui/module-task-ui/module-task-ui.component';


@Component({
  selector: 'app-module',
  templateUrl: './module-task.component.html',
  styleUrls: ['./module-task.component.css']
})

export class ModuleTaskComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search';
  isLoading: boolean = false;
  displayedColumns: string[] = ['id_module', 'description','actions'];
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
  this.getWebsiteMenu();
  
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
      this.getWebsiteMenu(); // Refresh the table after dialog closure
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
          this.getWebsiteMenu(); // Refresh the table after dialog closure
        }
  
        // Reset selected row after dialog is closed
        this.selectedRow = null;
      });
    }
  }
  async getWebsiteMenu(): Promise<void> {
    this.isLoading = true;
    try {
      const res = await firstValueFrom(this.menuServices.get());
  
      if (res?.data?.length) {
        this.dataSource.data = res.data;
        this.roles = res.data;
      } else {
        this.notificationsService.toastrWarning("No data found");
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
    this.notificationsService.popupWarning(role.about," "+"Are you sure to delete this ").then((result) => {
      if (result.value) 
      {
        this.menuServices.delete(role.transNo).subscribe({
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
                this.getWebsiteMenu();
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
  const dialogRef = this.dialog.open(ModuleTaskUIComponent, {
    width: '600px',
    data: element || null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getWebsiteMenu();
    }
  });
}

}
