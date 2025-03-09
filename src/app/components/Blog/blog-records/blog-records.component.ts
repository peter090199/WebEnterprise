import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleUIComponent } from 'src/app/components-ui/system/role-ui/role-ui.component';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { ImageService } from 'src/app/Services/Images/image.service';
import { BlogImageUIComponent } from 'src/app/components-ui/Website/Images/blog-image-ui/blog-image-ui.component';


@Component({
  selector: 'app-blog-records',
  templateUrl: './blog-records.component.html',
  styleUrls: ['./blog-records.component.css']
})



export class BlogRecordsComponent implements OnInit,AfterViewInit {
  searchKey: string = '';
  placeHolder: string = 'Search';
  isLoading: boolean = false;
  displayedColumns: string[] = ['transCode', 'title','description','file_path','actions'];
  dataSource = new MatTableDataSource<any>([]);
  roles: any[] = [];

  pageSizeOptions   : number[] = [5, 10, 25, 100];
  success: boolean = false;
  images: any[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private notificationsService:NotificationsService, private imageService: ImageService, 
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  const dialogRef = this.dialog.open(RoleUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadImages(); // Refresh the table after dialog closure
    }
  });
}

loadImages(): void {
  this.isLoading = true;
  this.imageService.getImages().subscribe({
    next: ({ success, images, message }) => {
      this.roles = message;
      this.dataSource.data = success && Array.isArray(images)
        ? images.map(({ id, url, transCode, title, description }) => ({
            id, transCode, title, description,
            file_path: url?.replace(/\\/g, '/') || ''
          }))
        : [];

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: () => (this.isLoading = false)
  });
}

// loadImages(): void {
//   this.isLoading = true;
//   this.imageService.getImages().subscribe({
//     next: (response) => {
//       if (response?.success && Array.isArray(response.images)) {
//         this.roles = response.message;
//         this.dataSource.data = response.images.map((image: { id: number; url?: string; transCode: any; title: any; description:any }) => ({
//           id: image.id,
//           transCode: image.transCode,
//           file_path: image.url ? image.url.replace(/\\/g, '/') : '',
//           title: image.title,
//           description: image.description
//         }));
//         this.dataSource.paginator = this.paginator; // ✅ Ensure paginator is set
//         this.dataSource.sort = this.sort; // ✅ Ensure sorting is set
//       } else {
//         console.warn('No images found in response.');
//         this.dataSource.data = [];
//       }
//       this.isLoading = false;
//     },
//     error: (error) => {
//       console.error('Error fetching images:', error);
//       this.isLoading = false;
//     }
//   });
// }

delete(role:any):void{

    this.notificationsService.popupWarning(role.transCode," "+"Are you sure to delete this role?").then((result) => {
      if (result.value) 
      {
        this.imageService.deleteImage(role.transCode).subscribe({
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
                this.loadImages();
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
  const dialogRef = this.dialog.open(BlogImageUIComponent, {
    width: '600px',
    data: element || null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadImages();
    }
  });
}


}
