import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;


  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    ) { }

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
          if (data && data.access) {
            this.onSuccessfulLogin();
          }

          
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

  // onSuccessfulLogin() {
  //   let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
  //   if (userData && userData.access) {
  //    this.authService.getUserprofile().subscribe(
  //      (data: any) => {
  //         sessionStorage.setItem('userprofile', JSON.stringify(data));
  //         if (data.is_staff) {
  //           this.router.navigate(['/home']);
  //         }
  //         else {
  //           this.router.navigate(['/home']);
  //         }
  //       }
  //     );
  // }
  // else {
  //   console.log("login failed");
  // }

  onSuccessfulLogin() {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      this.authService.getAuthenticationsApprovals().subscribe(
        (data: any) => {
          sessionStorage.setItem('approvals', JSON.stringify(data));
        }
      );

    }
    else {
      console.log("login failed");
    }
}

  
  





}



