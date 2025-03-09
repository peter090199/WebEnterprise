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


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search';
  isLoading: boolean = false;
  displayedColumns: string[] = ['transNo', 'desccode', 'description', 'route', 'status','updated_by','actions'];
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
    this.getMenus();
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
  dialogConfig.width = '400px';

  const dialogRef = this.dialog.open(MenuUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getMenus(); // Refresh the table after dialog closure
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
          this.getMenus(); // Refresh the table after dialog closure
        }
  
        // Reset selected row after dialog is closed
        this.selectedRow = null;
      });
    }
  }
  
async getMenus(): Promise<void> {
  this.isLoading = true;
     try {
       const res = await firstValueFrom(this.menuServices.getMenu());
       if (res) {
         this.dataSource.data =  res;
         this.isLoading = false;
         this.roles = res;
       }
     } catch (error) {
       console.error('Error:', error);
     } finally {
       this.isLoading = false;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     }
}


delete(role:any):void{
    this.notificationsService.popupWarning(role.description," "+"Are you sure to delete this menu? ").then((result) => {
      if (result.value) 
      {
        this.menuServices.deleteMenu(role.transNo).subscribe({
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
                this.getMenus();
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
  // const dialogRef = this.dialog.open(RoleUIComponent, {
  //   width: '400px',
  //   data: element || null
  // });

  // dialogRef.afterClosed().subscribe(result => {
  //   if (result) {
  //     this.getRoles();
  //   }
  // });
}

}
