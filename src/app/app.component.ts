import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ApprovalService } from './services/approval.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent implements OnInit {

  public userDropdownClicked: boolean = false;
  isApprover: boolean | null | undefined;
  
  constructor(private router: Router, private authService: AuthService,) {
    const approverValue = sessionStorage.getItem('approvals');
    if (approverValue) {
      // from approverValue get is_approver value
      const approver = JSON.parse(approverValue);
      this.isApprover = approver.is_approver;

    }
    else {
      this.isApprover = false;
    }

   }

  ngOnInit() {
    this.authService.autoLogin();
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
