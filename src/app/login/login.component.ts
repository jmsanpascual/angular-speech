import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials: any = {};
  returnUrl: string;
  showAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // Reset login status
    this.authService.logout();
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(event: any): void {
    event.preventDefault();
    this.showAlert = false;

    this.authService.login(this.credentials.username, this.credentials.password)
        .subscribe(
          user => {
              if (!user) {
                this.showAlert = true;
                return;
              }
              this.router.navigate([this.returnUrl]);
          }
        );
  }

  onAlertClosed(): void {
    this.showAlert = false;
  }
}
