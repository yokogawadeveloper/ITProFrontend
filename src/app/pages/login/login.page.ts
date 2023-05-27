import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;


  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password,)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/home']);

        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        });
  }

  logout() {
    this.authService.logout();
  }





}



