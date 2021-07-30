import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  	if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  }

  onSubmit(): void {
    this.authService.verify(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user): void {
	this.tokenStorage.saveUser(user);
	this.isLoginFailed = false;
	this.isLoggedIn = true;
	this.currentUser = this.tokenStorage.getUser();
  this.router.navigate(['/home']);
  }
}
