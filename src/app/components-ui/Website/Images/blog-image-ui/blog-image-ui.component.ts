// import { Component, Inject, OnInit } from '@angular/core';
// import { ImageService } from 'src/app/Services/Images/image.service';
// import { NotificationsService } from 'src/app/Services/Global/notifications.service';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-blog-image-ui',
//   templateUrl: './blog-image-ui.component.html',
//   styleUrls: ['./blog-image-ui.component.css']
// })
// export class BlogImageUIComponent implements OnInit {
//   selectedFiles: File[] = [];
//   imagePreviews: string[] = [];
//   private authToken: string = '';
//   datalist: any;
//   isUploading: boolean = false;
//   btnSave: string='Save';
//   blogForm!: FormGroup;
//   transNo:any;



//   constructor(
//     private imageService: ImageService,
//     private notificationService: NotificationsService, 
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {
//     this.datalist = this.data;
//     this.transNo = this.data.transNo;

//   }

//   ngOnInit() {
//     if (this.datalist)
//       {
//         if(this.datalist.transCode)
//           {
//              this.btnSave = "Update";
//              this.GetItemFormData();
//           }
    
//       }
//     else
//     {
//       this.authToken = localStorage.getItem("token") ?? '';

//       this.blogForm = this.fb.group({
//         title: ['', Validators.required],
//         description: ['', Validators.required],
//         stats: this.fb.array([
//           this.createStat("100+", "Holiday Packages"),
//           this.createStat("150+", "Luxury Hotels"),
//           this.createStat("10K+", "Happy Customers")
//         ])
//       });
//     }
//   }

//   GetItemFormData(){
//     this.blogForm.controls['file_path'].setValue(this.data.file_path);
//     this.blogForm.controls['title'].setValue(this.data.title);
//     this.blogForm.controls['description'].setValue(this.data.description);
   
//   }

//   // Getter for form array
//   get statsArray(): FormArray {
//     return this.blogForm.get('stats') as FormArray;
//   }

//   // Create new stat form group
//   createStat(value: string = '', label: string = ''): FormGroup {
//     return this.fb.group({
//       value: [value, Validators.required],
//       label: [label, Validators.required]
//     });
//   }

//   addStat() {
//     this.statsArray.push(this.createStat());
//   }

//   removeStat(index: number) {
//     if (this.statsArray.length > 1) {
//       this.statsArray.removeAt(index);
//     } else {
//       this.notificationService.toastrWarning("At least one statistic is required.");
//     }
//   }

//   // File selection handler
//   onFileSelect(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files) {
//       this.selectedFiles = Array.from(input.files);
//       this.imagePreviews = [];

//       this.selectedFiles.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = (e: ProgressEvent<FileReader>) => {
//           if (e.target?.result) {
//             this.imagePreviews.push(e.target.result as string);
//           }
//         };
//         reader.readAsDataURL(file);
//       });
//     }
//   }

//   removeImage(index: number): void {
//     this.selectedFiles.splice(index, 1);
//     this.imagePreviews.splice(index, 1);
//   }
  
//   uploadFiles() {
//     if (this.selectedFiles.length === 0) {
//       this.notificationService.toastrWarning("Please select files to upload.");
//       return;
//     }
  
//     if (!this.authToken) {
//       this.notificationService.toastrWarning("Authentication error: Please log in again.");
//       return;
//     }
  
//     const title = this.blogForm.value.title;
//     const description = this.blogForm.value.description;
//     const stats = this.statsArray.value; // Ensure it's an array
  
//     const formData = new FormData();
//     this.selectedFiles.forEach((file) => {
//       formData.append('files[]', file);
//     });
  
//     formData.append('transNo', this.transNo);
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('stats', JSON.stringify(stats)); // Convert array to JSON string
  
//     console.log("Uploading files with details:", {
//       selectedFiles: this.selectedFiles,
//       transNo: this.transNo,
//       title,
//       description,
//       stats
//     });
  
//     this.imageService.uploadImages(formData).subscribe({
//       next: (response: any) => {
//         this.notificationService.toastrSuccess(response.message || "Images uploaded successfully.");
//         this.selectedFiles = [];
//         this.imagePreviews = [];
//         this.isUploading = false;
  
//         // Reset file input
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//         if (fileInput) {
//           fileInput.value = '';
//         }
//       },
//       error: (error) => {
//         console.error('Upload failed:', error);
//         this.notificationService.toastrWarning(error.error?.message || "Upload failed. Please try again.");
//         this.isUploading = false;
//       }
//     });
//   }
  
//   uploadFilesxxx() {
//     if (this.selectedFiles.length === 0) {
//       this.notificationService.toastrWarning("Please select files to upload.");
//       return;
//     }

//     if (!this.authToken) {
//       this.notificationService.toastrWarning("Authentication error: Please log in again.");
//       return;
//     }

//     if (this.blogForm.invalid) {
//       this.notificationService.toastrWarning("Please fill in all required fields.");
//       return;
//     }

//     const title = this.blogForm.value.title;
//     const description = this.blogForm.value.description;
//     const stats = this.statsArray.value;  // Extract stats array


//     this.isUploading = true;

//     this.imageService.uploadImagescc(this.selectedFiles, this.data, title, description, stats).subscribe({
//       next: (response: any) => {
//         this.notificationService.toastrSuccess(response.message || "Images uploaded successfully.");
//         this.selectedFiles = [];
//         this.imagePreviews = [];
//         this.blogForm.reset();
//         this.statsArray.clear();
        
//         // Re-initialize default stats
//         this.statsArray.push(this.createStat("100+", "Holiday Packages"));
//         this.statsArray.push(this.createStat("150+", "Luxury Hotels"));
//         this.statsArray.push(this.createStat("10K+", "Happy Customers"));

//         this.isUploading = false;
//       },
//       error: (error) => {
//         console.error('Upload failed:', error);
//         this.notificationService.toastrWarning(error.error?.message || "Upload failed. Please try again.");
//         this.isUploading = false;
//       }
//     });
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from 'src/app/Services/Images/image.service';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-image-ui',
  templateUrl: './blog-image-ui.component.html',
  styleUrls: ['./blog-image-ui.component.css']
})
export class BlogImageUIComponent implements OnInit {
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  authToken: string = '';
  isUploading: boolean = false;
  btnSave: string = 'Save';
  blogForm!: FormGroup;
  transNo: any;




  constructor(
    private imageService: ImageService,
    private notificationService: NotificationsService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.transNo = this.data.transNo;
  }

  ngOnInit() {
    this.authToken = localStorage.getItem("token") ?? '';

    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file_path: [''], // Store existing file path for edits
      stats: this.fb.array([ this.createStat()])
    });

    if (this.data?.transCode) {
      this.btnSave = "Update";
      this.populateFormData();
    }
  }

  // Populate form when editing
  populateFormData() {
    this.blogForm.patchValue({
      title: this.data.title,
      description: this.data.description,
      file_path: this.data.file_path
    });

    if (this.data.file_path) {
      this.imagePreviews = [this.data.file_path];
    }
  }

  // Getter for form array
  get statsArray(): FormArray {
    return this.blogForm.get('stats') as FormArray;
  }

  // Create new stat form group
  createStat(): FormGroup {
    return this.fb.group({
      value: ['', Validators.required],
      label: ['', Validators.required]
    });
  }

  addStat() {
    this.statsArray.push(this.createStat());
  }

  removeStat(index: number) {
    if (this.statsArray.length > 1) {
      this.statsArray.removeAt(index);
    } else {
      this.notificationService.toastrWarning("At least one statistic is required.");
    }
  }

  // Handle file selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.imagePreviews = [];

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imagePreviews.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  uploadFiles() {
    if (this.blogForm.invalid) {
      this.notificationService.toastrWarning("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files[]', file);
    });

    // formData.append('transCode', this.data.transCode);
    formData.append('transNo', this.data.transNo);
    formData.append('title', this.blogForm.value.title);
    formData.append('description', this.blogForm.value.description);
    formData.append('stats', JSON.stringify(this.statsArray.value));
    
    this.isUploading = true;

    if (this.data?.transCode) {
     formData.append('transCode', this.data.transCode);

      this.imageService.updateImages(formData).subscribe({
        next: (response: any) => {
          this.notificationService.toastrSuccess(response.message || "Data updated successfully.");
          this.resetForm();
        },
        error: (error) => {
          console.error('Update failed:', error);
          this.notificationService.toastrWarning(error.error?.message || "Update failed. Please try again.");
          this.isUploading = false;
        }
      });
    } else {
      // Create new image entry
      this.imageService.uploadImages(formData).subscribe({
        next: (response: any) => {
          this.notificationService.toastrSuccess(response.message || "Images uploaded successfully.");
          this.resetForm();
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.notificationService.toastrWarning(error.error?.message || "Upload failed. Please try again.");
          this.isUploading = false;
        }
      });
    }
  }


  uploadFilesxxx() {
    if (this.blogForm.invalid) {
      this.notificationService.toastrWarning("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('transNo', this.transNo);
    formData.append('title', this.blogForm.value.title);
    formData.append('description', this.blogForm.value.description);
    formData.append('stats', JSON.stringify(this.statsArray.value));

    this.isUploading = true;

    // If updating (transCode exists), use update API
    if (this.data?.transCode) {
      formData.append('transCode', this.data.transCode);
      this.imageService.uploadImages(formData).subscribe({
        next: (response: any) => {
          this.notificationService.toastrSuccess(response.message || "Image updated successfully.");
          this.resetForm();
        },
        error: (error) => {
          console.error('Update failed:', error);
          this.notificationService.toastrWarning(error.error?.message || "Update failed. Please try again.");
          this.isUploading = false;
        }
      });
    } 
    // Otherwise, create new entry
    else {
      this.imageService.uploadImages(formData).subscribe({
        next: (response: any) => {
          this.notificationService.toastrSuccess(response.message || "Images uploaded successfully.");
          this.resetForm();
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.notificationService.toastrWarning(error.error?.message || "Upload failed. Please try again.");
          this.isUploading = false;
        }
      });
    }
  }

  resetForm() {
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.blogForm.reset();
    this.statsArray.clear();
    this.isUploading = false;

    // Reinitialize default stats
    this.statsArray.push(this.createStat());

  }
}

