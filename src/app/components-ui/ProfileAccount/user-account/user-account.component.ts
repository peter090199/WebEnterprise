import { Component, OnInit } from '@angular/core';
import { SecurityRolesService } from 'src/app/Services/Security/security-roles.service'; // Import the ProfileService

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
onUploadPicture() {
}
saveChanges() {
}
resetChanges() {
}
  profilePictureUrl: string | undefined;
  token: any; // Token to be passed (could be from AuthService or local storage)
  user: any = {};
  isLoading: boolean = false;

  constructor(
    private profileService: SecurityRolesService,
  ) {}

  ngOnInit(): void {
    this.fetchProfilePicture();
  }

  fetchProfilePicture(): void {
    this.profileService.getDataUserAccount().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching profile picture:', error);
      }
    );
  }
}
