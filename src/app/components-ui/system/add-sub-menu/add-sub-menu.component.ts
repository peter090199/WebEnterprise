import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubMenuService } from 'src/app/Services/SubMenu/sub-menu.service';

@Component({
  selector: 'app-add-sub-menu',
  templateUrl: './add-sub-menu.component.html',
  styleUrls: ['./add-sub-menu.component.css']
})
export class AddSubMenuComponent implements OnInit {
  transNo: any;
  submenuForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submenuService: SubMenuService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transNo = data.transNo;
  }

  ngOnInit(): void {
    // Initialize the form with transNo
    this.submenuForm = this.fb.group({
      transNo: [this.transNo, Validators.required], // Ensure transNo is part of the form
      lines: this.fb.array([this.createSubmenu()]) // Initialize with one submenu entry
    });
  }

  // Method to create a submenu entry with validations
  createSubmenu(): FormGroup {
    return this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      icon: ['', Validators.required],
      class: ['', Validators.required],
      routes: ['', Validators.required],
      sort: [null, [Validators.required, Validators.min(1)]],
      status: ['A']
    });
  }

  // Getter for lines FormArray
  get lines(): FormArray {
    return this.submenuForm.get('lines') as FormArray;
  }

  // Method to add a new submenu entry
  addSubmenu(): void {
    this.lines.push(this.createSubmenu());
  }

  // Method to remove a submenu entry
  removeSubmenu(index: number): void {
    this.lines.removeAt(index);
  }

  // Method to save submenu data
  saveSubmenus(): void {
    // Check if form is valid before submitting
    if (this.submenuForm.valid) {
      const data = this.submenuForm.value;
      console.log('Form Data:', data);

      // Sending the data to the backend
      this.submenuService.saveSubmenu(data).subscribe(
        (response) => {
          console.log('Submenu data saved successfully:', response);
          // Optionally, show a success message to the user
        },
        (error) => {
          console.error('Error saving submenu data:', error);
        }
      );
    } else {
      console.log('Form is invalid!');
    }
  }
}
