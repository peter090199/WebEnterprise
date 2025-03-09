import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-module-task-ui',
  templateUrl: './module-task-ui.component.html',
  styleUrls: ['./module-task-ui.component.css']
})
export class ModuleTaskUIComponent implements OnInit{
  menuForm: FormGroup;
  btnSave: string = "Save";
  modules:any = [];
  selectedImages: File[] = []; // Store selected image files
  uploadedImages: string[] = []; // Store uploaded image URLs
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(private fb: FormBuilder,private menuServices:MenuService,private alert:NotificationsService,
              private http:HttpClient

  ) {
    this.menuForm = this.fb.group({
      module: ['', Validators.required],
      description: ['', Validators.required],
      price: this.fb.array([]), // Using an array for price
     // image: this.fb.array([]), // Using an array for images
      desc_images: this.fb.array([]), // Using an array for description images
    //  images: [null, Validators.required] 
    });
  }



  selectedTransNo!: string;  // Holds the selected transNo
  isModuleSelected: boolean = false; // Flag to hide combo box after selection


 // Add price to the FormArray
 addPrice(price: string): void {
  // Convert price to number and add it to the FormArray
  const parsedPrice = parseFloat(price);
  if (!isNaN(parsedPrice) && parsedPrice > 0) {
    this.price.push(this.fb.control(parsedPrice));  // Add price control to FormArray
  }
}

  get image(): FormArray {
    return this.menuForm.get('image') as FormArray;
  }
  get price(): FormArray {
    return this.menuForm.get('price') as FormArray;
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image.push(this.fb.control(reader.result)); // Store Base64
      };
    }
  }
  // onFileSelected(event: any): void {
  //   this.selectedImages = Array.from(event.target.files);
  // }


  removeImage(index: number) {
    this.image.removeAt(index);
  }
  removePrice(index: number) {
    this.price.removeAt(index);
  }
  ngOnInit(): void {
    this.getWebsiteMenu();
    
  }


    async getWebsiteMenu(): Promise<void> {
      try {
        const res = await firstValueFrom(this.menuServices.getWebsiteMenu());
        
        if (res && res.data) { // Assuming 'data' is the key for the actual data in the response
          this.modules = res.data;
        } else {
        //  this.notificationsService.toastrWarning("No data found");
        }
      } catch (error) {
     //   this.notificationsService.toastrError(error);
      } finally {
        // Ensure that loading is false even if there is an error
     //   this.isLoading = false;
      
      }
    }
    
  

  // Add image URL to the form
  addImage(image: string) {
    this.menuForm.get('image')?.value.push(image);
  }

  // Add description image to the form
  // addDescImage(descImage: string) {
  //   this.menuForm.get('descImages')?.value.push(descImage);
  // }
  get desc_images(): FormArray {
    return this.menuForm.get('desc_images') as FormArray;
  }
  addDescImage(descImage: string) {
    if (descImage && descImage.trim() !== '') {
      this.desc_images.push(this.fb.control(descImage));  // Use fb.control to add form control to FormArray
    }
  }

  onSubmitxx() {
    // Create a FormData object to handle file uploads
    const formData = new FormData();
  
    // Add other form fields to the FormData
    formData.append('module', this.menuForm.get('module')?.value);
    formData.append('description', this.menuForm.get('description')?.value);
    formData.append('price', JSON.stringify(this.price.value));  // Array of prices as string
    formData.append('desc_images', JSON.stringify(this.menuForm.get('descImages')?.value)); // Array of descriptions
  
    const imageInput = this.imageInput.nativeElement;  // Reference to the file input element

    // Add the filenames of selected images to FormData
    const imageFilenames: string[] = []; // Array to store filenames
    for (let i = 0; i < imageInput.files.length; i++) {
        const file = imageInput.files[i];
        formData.append('image[]', file, file.name);  // Append file to FormData with its filename
        imageFilenames.push(file.name);  // Add the filename to the array
    }
  
    // Add the array of filenames to the FormData
    formData.append('image_filenames', JSON.stringify(imageFilenames));

    // Log the FormData content manually
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    this.menuServices.submitMenu(formData).subscribe(
      (res) => {
        console.log('Form submitted successfully:', res);
        if (res.success) {
          console.log(res.message); // e.g., Show success message
        }
        
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
}

onSubmitxxx(): void {
  if (this.menuForm.valid) {
    const formData = new FormData();

    // Append form values
    formData.append('module', this.menuForm.value.module);
    formData.append('description', this.menuForm.value.description);
    // Append prices
    this.menuForm.value.price.forEach((price: any, index: number) => {
      formData.append(`price[${index}]`, price);
    });

    // Append description images
    this.menuForm.value.desc_images.forEach((descImage: any, index: number) => {
      formData.append(`desc_images[${index}]`, descImage);
    });

    // Append images
    this.selectedImages.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    // Upload data to Laravel API
    this.http.post('http://127.0.0.1:8000/api/upload-images', formData).subscribe(
      (response: any) => {
        alert('Form submitted successfully!');
        this.uploadedImages = response.images.map((img: any) => `http://127.0.0.1:8000/uploads/${img.filename}`);
      },
      (error) => {
        console.error('Upload failed:', error);
      }
    );
  } else {
    alert('Please fill all required fields.');
  }
}

onModuleSelect(event: any) {
  // Get the transNo based on the selected module
  const selectedModule = this.modules.find((module: { module: any; }) => module.module === event.value);
  if (selectedModule) {
    this.selectedTransNo = selectedModule.transNo;  // Save transNo
    console.log('Selected transNo:', this.selectedTransNo);
  }
}

onSubmit() {
  const menu = this.menuForm.value;
  menu.transNo = this.selectedTransNo;

  console.log(menu);  // Log the full menu object with transNo

  this.menuServices.submitMenus(menu).subscribe(
    (res) => {
      if (res.success) {
        this.alert.toastrSuccess(res.message);
        this.ResetForm();
      } else {
        this.alert.toastrError(res.error);
      }
    },
    (error) => {
      this.alert.toastrError(error.error);
    }
  );

  this.ResetForm();
}

  ResetForm() {
    this.menuForm.reset(); // Reset form fields
  
    // // Clear and reinitialize FormArrays
    this.price.clear();
    this.desc_images.clear();
  
    // // Optionally set default values (if needed)
    // this.menuForm.patchValue({
    //   module: '',
    //   desc_images: '',
    // });
  }
  
  
  
}



// import { Component, Inject, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { NotificationsService } from 'src/app/Services/Global/notifications.service';
// import { MenuService } from 'src/app/Services/Menu/menu.service';
// @Component({
//   selector: 'app-module-task-ui',
//   templateUrl: './module-task-ui.component.html',
//   styleUrls: ['./module-task-ui.component.css']
// })
// export class ModuleTaskUIComponent implements OnInit {
//   menuForm!: FormGroup;
//   btnSave: string = 'Save';
//   modules = ['Module 1', 'Module 2', 'Module 3', 'Module 4'];

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<ModuleTaskUIComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
    
//     private notificationService:NotificationsService,private menuService:MenuService
//       ) {
//         this.menuForm = this.fb.group({
//           module: ['', [Validators.required]],
//           routes: ['', [Validators.required]],
//           sort: ['', [Validators.required, Validators.min(1)]],
//           status: ['', [Validators.required]], // Default to Active
//         });
//   }

//   ngOnInit(): void {

//     if (this.data != null)
//       {
//         if(this.data.transNo)
//           {
//              this.btnSave = "Update";
//              this.GetItemFormData();
//           }
    
//       }
//   }

  
//   GetItemFormData(){
//     this.menuForm.controls['module'].setValue(this.data.module);
//     this.menuForm.controls['routes'].setValue(this.data.routes);
//     this.menuForm.controls['sort'].setValue(this.data.sort);
//     this.menuForm.controls['status'].setValue(this.data.status);
   
//   }


//   get lines(): FormArray {
//     return this.menuForm.get('lines') as FormArray;
//   }

//   createSubmenu(): FormGroup {
//     return this.fb.group({
//       description: [''],
//       icon: [''],
//       class: [''],
//       routes: [''],
//       sort: ['', [Validators.min(1)]],
//       status: [''] // Default to Active
//     });
//   }

//   addSubmenu(): void {
//     this.lines.push(this.createSubmenu());
//   }

//   removeSubmenu(index: number): void {
//     if (this.lines.length > 1) {
//       this.lines.removeAt(index);
//     }
//   }

//   loading:boolean = false;
//   onSubmit(): void {
//      if (this.menuForm.valid) {
//       const menuData = this.menuForm.value;
//       this.loading = true;
//        if(this.btnSave === "Save") 
//         {
//           console.log(menuData)
//           this.menuService.postWebsiteMenu(menuData).subscribe(
//             (response) => {
//               if (response.success == true) {
//                 this.notificationService.toastrSuccess(response.message);
//                 this.loading = false;
//                 this.ResetForm();
//               }
//               else
//               {
//                 this.notificationService.toastrSuccess(response.message);
//                 this.loading = false;
//               }
//             },
//             (error) => {
//               console.error('Error saving menu:', error);
//             }

            
//           );
//         }
//         else if (this.btnSave === 'Update') {
//           this.menuService.editWebsiteMenu(this.data.transNo, menuData ).subscribe({
//             next: (res) => {
//               if(res.success === true)
//                 {
//                   this.notificationService.toastrSuccess(res.message);
//                   this.ResetForm();
//                   this.loading = true;
//                 }
//                 else{
//                   this.notificationService.toastrWarning(res.message);
//                   this.loading = false; 
//                 }
                
//             },
//             error: (err) => {
//               this.notificationService.toastrWarning(err.error);
//               this.loading = false;  // Set loading to false in case of error
//             },
//           });
//         }
//     }
//   }

//   ResetForm(){
//     this.menuForm.reset();
//   }



//   onSubmitx(): void {
//     if (this.menuForm.valid) {


//       this.dialogRef.close(this.menuForm.value); 
//     }
//   }

  
//   onSubmitxx(): void {
//     if (this.menuForm.valid) {
//     const menu = this.menuForm.getRawValue(); 
//    //   this.loading = true;
   
//       if(this.btnSave === "Save") 
//       {
//         this.menuService.postData(menu).subscribe({
//           next: (res) => {
//           if(res.success === true)
//           {
//             this.notificationService.toastrSuccess(res.message);
//            // this.ResetForm();
//           //  this.loading = false;
//           }
//           else{
//             this.notificationService.toastrError(res.message);
//           //  this.loading = false; 
//           }
          
//           },
//           error: (error) => {
//          //   this.success = false;
//             this.notificationService.toastrError(error.error);
//         //    this.loading = false; 
//             // Set loading to false in case of error
//           },
//         });
//       }
//       // else if (this.btnSave === 'Update') {
//       //   this.roleService.putData(this.data.id, role).subscribe({
//       //     next: (res) => {
//       //       if(res.success === true)
//       //         {
//       //           this.notificationService.toastrSuccess(res.message);
//       //           this.ResetForm();
//       //           this.loading = true;
//       //         }
//       //         else{
//       //           this.notificationService.toastrWarning(res.message);
//       //           this.loading = false; 
//       //         }
              
//       //     },
//       //     error: (err) => {
//       //       this.notificationService.toastrWarning(err.error);
//       //       this.loading = false;  // Set loading to false in case of error
//       //     },
//       //   });
//       // }
//     } else {
//       this.notificationService.toastrError("Please fill in the required fields.");
//     }
//   }

// }


