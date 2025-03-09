import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/Services/Security/security-roles.service';
import { SecurityRolesUIComponent } from 'src/app/components-ui/system/security-roles-ui/security-roles-ui.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-security-roles',
  templateUrl: './security-roles.component.html',
  styleUrls: ['./security-roles.component.css']
})
export class SecurityRolesComponent implements OnInit {
  searchKey = '';
  placeHolder: string = 'Search security roles';
  displayedColumns = ['id', 'rolecode', 'description', 'created_by', 'updated_by', 'actions'];
  dataSource = new MatTableDataSource<any>();
  isLoading = false;
  pageSizeOptions = [5, 10, 25, 100];
  csecurityroles:any=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private securityRoleService: SecurityRolesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchSecurityRoles();
  }

  async fetchSecurityRoles(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await firstValueFrom(this.securityRoleService.getSecurityRoles());
      if (response.success) {
        this.csecurityroles = response.message;
        this.dataSource.data =  this.csecurityroles;
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  View(): void {
    this.fetchSecurityRoles(); 
    }
    
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter();
  }

  refresh() {
    this.fetchSecurityRoles();
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(SecurityRolesUIComponent, {
      width: '400px',
      height:'520px',
      data: element,
      panelClass: 'scrollable-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchSecurityRoles();
    });
  }
}
