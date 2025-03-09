import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { SigInService } from 'src/app/Services/signIn/sig-in.service';

@Component({
  selector: 'app-sign-in-ui',
  templateUrl: './sign-in-ui.component.html',
  styleUrls: ['./sign-in-ui.component.css']
})
export class SignInUIComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hide = true; // For password visibility toggle
  checked = false; // Remember me checkbox
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sigInService: SigInService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
  }
  refreshHomePage() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }



  // Initialize the login form
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [
        Validators.required,
      //  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  simulateLogin(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate incorrect password (replace with real validation logic)
        resolve(password === 'correct-password');
      }, 1000);
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  status: string = "";
  
  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid ) {
    const { username, password } = this.loginForm.value;
    this.isLoading = true; // Start loading indicator
    this.sigInService.signin(username, password).subscribe({
      next: (res) => {
        if (res.success === true) {
            if(res.message == 0){
               this.router.navigate(['/home']);
            }else{
              this.router.navigate(['/home']);
            }
            this.loginForm.reset(); 
            this.isLoading = false;
        }
        else
        {
          this.isLoading = false;
          this.notificationService.toastPopUpError(res.message);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.notificationService.toastrError(err.error);
        } else {
          this.notificationService.toastPopUpError(err.message);
        }
        this.isLoading = false; // Stop loading on error
      },
      complete: () => {
        this.isLoading = false; // Stop loading on completion
      }
    });
  }
}
}
