import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { firstValueFrom } from 'rxjs';
import { SubMenuService } from 'src/app/Services/SubMenu/sub-menu.service';
import { AddSubMenuComponent } from '../add-sub-menu/add-sub-menu.component';

@Component({
  selector: 'app-sub-menu-ui',
  templateUrl: './sub-menu-ui.component.html',
  styleUrls: ['./sub-menu-ui.component.css']
})
export class SubMenuUIComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search';
  isLoading: boolean = false;
  displayedColumns: string[] = ['transNo', 'description','route', 'status'];
  dataSource = new MatTableDataSource<any>([]);
  roles: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  success: boolean = false;
  selectedRow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationsService: NotificationsService,
    private dialogRef: MatDialogRef<SubMenuUIComponent>,
    private submenuServices: SubMenuService,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog
  ) {
    this.selectedRow = data.selectedRow; // Initialize selectedRow from dialog data
  }

  ngOnInit(): void {
    if (this.selectedRow) {
      this.getSubMenus(); // Fetch submenus when component is initialized
    }
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog on cancel
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  clearSearch(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  async getSubMenus(): Promise<void> {
    this.isLoading = true;
    try {
      if (this.selectedRow?.transNo) {
        const res = await firstValueFrom(this.submenuServices.getSubMenu(this.selectedRow.transNo));
        if (res.success === true) {
          this.dataSource.data = res.submenus; // Update dataSource with the submenus array
          this.roles = res.submenus; // Optionally use roles or other purposes
        } else {
          this.notificationsService.toastrError('Failed to load submenus.');
        }
      } else {
        this.notificationsService.toastrError('No transaction number available.');
      }
    } catch (error) {
      console.error('Error fetching submenus:', error);
      this.notificationsService.toastrError('Failed to load submenus.');
    } finally {
      this.isLoading = false;
      this.dataSource.paginator = this.paginator; // Add paginator to the table
      this.dataSource.sort = this.sort; // Add sorting to the table
    }
  }

  delete(role: any): void {
    this.notificationsService.popupWarning(role.description, 'Are you sure to delete this menu?').then((result) => {
      if (result.value) {
        this.submenuServices.deleteMenu(role.transNo).subscribe({
          next: (res) => {
            if (res.success === true) {
              this.notificationsService.toastrSuccess(res.message);
            } else {
              this.notificationsService.toastrError(res.message);
            }
            this.getSubMenus(); // Refresh the table data
          },
          error: (error) => {
            this.notificationsService.toastrError(error.error || 'Error occurred');
            this.isLoading = false;
          }
        });
      }
    });
  }

  onTransNoClick(transNo: string): void {
    console.log('Selected TransNo:', transNo);
    // Fetch submenu data based on transNo if needed
    // this.getSubMenuData(transNo);
  }

  edit(element: any): void {
    // Open edit dialog with the selected element
    // const dialogRef = this.dialog.open(EditDialogComponent, { data: element });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getSubMenus(); // Refresh the table data after edit
    //   }
    // });
  }

  onRowClick(row: any): void {
    this.selectedRow = row; // Set the selected row when clicked
    console.log('Selected Row:', row);
  }

  deletex(row: any): void {
    console.log('Deleting row:', row);
    // Implement additional delete functionality if necessary
  }


     newSubmodule(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '600px';
        dialogConfig.data = this.selectedRow;
        console.log(this.selectedRow)
        const dialogRef = this.dialog.open(AddSubMenuComponent, dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.getSubMenus(); // Refresh the table after dialog closure
          }
    
        });
    }
}
