import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { ImageService } from 'src/app/Services/Images/image.service';

interface Image {
  id: number;
  user_code?: string;
  trans_no?: string;
  transCode: string;
  file_path: string;
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  images: Image[] = []; // Store images from API
  selectedImage: string | null = null; // Store selected image for preview
  loading: boolean = false; // Loading state for fetching images
  deleteLoading: { [key: number]: boolean } = {}; // Track loading state for each delete action
  imageLoaded: { [key: number]: boolean } = {}; // Track which images are loaded

  constructor(
    private imageService: ImageService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  // Load images from API
  loadImages(): void {
    this.loading = true;
    this.imageService.getImages().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (response?.success && Array.isArray(response.images)) {
          this.images = response.images.map((image: any) => ({
            id: image.id,
            transCode: image.transCode,
            file_path: image.url ? image.url.replace(/\\/g, '/') : ''
          }));
        } else {
          console.warn('No images found in response or invalid format.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
        this.loading = false;
      }
    });
  }

  // Open image preview
  openPreview(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  // Close image preview
  closePreview(): void {
    this.selectedImage = null;
  }

  // Delete image
  delete(transCode: any): void {
    this.notificationsService.popupWarning(transCode, "Are you sure to delete this image?").then((result) => {
      if (result.value) {
        this.deleteLoading[transCode] = true;

        this.imageService.deleteImage(transCode).subscribe({
          next: (res) => {
            this.deleteLoading[transCode] = false;
            if (res.success) {
              this.notificationsService.toastrSuccess(res.message);
              this.loadImages(); // Refresh images after deletion
            } else {
              this.notificationsService.toastrError(res.message);
            }
          },
          error: (error) => {
            this.deleteLoading[transCode] = false;
            this.notificationsService.toastrError(error.error || 'Failed to delete image');
          }
        });
      }
    });
  }
}
