import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent implements OnInit {

  public userDropdownClicked: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  } // ngOnInit


  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }// toggleUserDropdown

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  } // logout
}
