import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AnimationController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;
  isApprover: boolean = false;
  rdata: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    private animationCtrl: AnimationController,
    private appcomponent: AppComponent,
  ) {
    this.animationCtrl.create()
  }

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

          const jdata = {
            is_admin: false,
            is_approver: true,
            is_dsin: false,
            is_requester: false,
          };

          this.rdata = JSON.stringify(data);


          this.authService.getModuleAccessList(this.rdata).subscribe(
            response => {
              sessionStorage.setItem('moduleAccess', JSON.stringify(response));
              console.log(response);
            },
            error => {
              // Handle the error
              console.error(error);
            }
          );


          this.appcomponent.ngOnInit();
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












