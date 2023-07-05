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
  isApprover!: boolean;
  currentUser: any;
  userTypes: any = [];
  username: string = ''; // Variable to store the username

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    const getCurrentUser = sessionStorage.getItem('currentUser');
    if (getCurrentUser) {
      this.currentUser = JSON.parse(getCurrentUser); // Assign the value to this.currentUser
      this.username = this.currentUser.username; // Update the username variable
      this.isApprover = this.currentUser.is_approver; // Update the isApprover variable
      console.log(this.isApprover);
    }
  }

  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('approvals');
    this.router.navigate(['/login']);
  }
}
