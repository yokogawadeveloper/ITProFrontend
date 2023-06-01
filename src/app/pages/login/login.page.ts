import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;


  constructor(private authService: AuthService, private router: Router, private toast: NgToastService) { }

  login() {
    this.authService.login(this.username, this.password,)
      .subscribe(
        data => {
          this.toast.success({
            detail: 'Login Successful',
            position: 'bottom-right',
            duration: 3000,
            type: 'success'
          })
          this.router.navigate(['/home']);

        },
        error => {
          this.toast.error({
            detail: 'Login Failed',
            position: 'bottom-right',
            duration: 3000,
            type: 'danger'
          })
          this.router.navigate(['/login']);
        });
  }

}



