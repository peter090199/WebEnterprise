import {Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { ImageService } from 'src/app/Services/Images/image.service';

interface Image {
  user_code: string;
  trans_no: string;
  file_path: string;
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  images: any[] = []; // Store images from API  images: Image[] = [];
  images2: Image[] = [];
  selectedImage: any | null = null; // Store selected image for popup
  constructor(private imageService: ImageService,private notificationsService:NotificationsService,
  ) {}
  imageLoaded: { [key: number]: boolean } = {}; // Track which images are loaded

  ngOnInit(): void {
    this.loadImages();
  }

  onImageError(event: any) {
    event.target.src = 'assets/default-placeholder.png'; // Set a default image
  }
  
  closePreview(): void {
    this.selectedImage = null;
  }
  
    // Open image preview
    openPreview(imageUrl: string): void {
      this.selectedImage = imageUrl;
      console.log(this.selectedImage)
    }

    
    loading: boolean = true; // Add loading state
    
    loadImages(): void {
      this.imageService.getImages().subscribe({
        next: (response) => {
          console.log('API Response:', response);
    
          if (response?.success && Array.isArray(response.images)) {
            this.images = response.images.map((image: { id: number; url?: string; transCode: any }) => ({
              id: image.id,
              transCode: image.transCode,
              file_path: image.url ? image.url.replace(/\\/g, '/') : ''
            }));
          } else {
            console.warn('No images found in response or invalid format.');
          }
        },
        error: (error) => {
          console.error('Error fetching images:', error);
        }
      });
    }
    
    deleteLoading: { [key: number]: boolean } = {}; // Track loading state for each image

    delete(transCode: any): void {
      this.notificationsService.popupWarning(transCode, "Are you sure to delete this image?").then((result) => {
        if (result.value) {

          this.imageService.deleteImage(transCode).subscribe({
            next: (res) => {

              if (res.success == true) {
                this.notificationsService.toastrSuccess(res.message);
                this.loadImages(); // Refresh images after deletion
              } else {
                this.notificationsService.toastrError(res.message);
              }
            },
            error: (error) => {
              this.deleteLoading[transCode] = false; // Stop loading on error
              this.notificationsService.toastrError(error.error);
            }
          });
        }
      });
    }

  openImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }



}
