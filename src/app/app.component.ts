import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ApprovalService } from 'src/app/services/approval.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public userDropdownClicked: boolean = false;
  approvalPendingList: any = [];
  currentUser: any;
  isApprover!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private approvalService: ApprovalService
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    const getCurrentUser = sessionStorage.getItem('currentUser');
    if (getCurrentUser) {
      this.currentUser = JSON.parse(getCurrentUser);
      this.isApprover = this.currentUser.is_approver; // Update the isApprover variable
      console.log(this.isApprover);
    }

    // Get the list of pending approvals for the current user 
    this.approvalService.getApprovalPendingList().pipe(
      map((response: any) => response.map((item: any) => item.procurementId))
    ).subscribe((procurementIds: any[]) => {
      this.approvalPendingList = procurementIds;
    });



  }// end of ngOnInit

  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }

  

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('approvals');
    this.router.navigate(['/login']);
  }
}
