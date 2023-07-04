import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ApprovalService } from './services/approval.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent implements OnInit {

  public userDropdownClicked: boolean = false;
  isApprover: boolean = false;

  constructor(private router: Router, private authService: AuthService,) {

  }

  ngOnInit() {
    const approvalsValue = sessionStorage.getItem('approvals');
    if (approvalsValue) {
      const approvals = JSON.parse(approvalsValue);
      this.isApprover = approvals.is_approver;
    }
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }




  } // ngOnInit



  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }// toggleUserDropdown

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('approvals');
    this.router.navigate(['/login']);
  } // logout
}
