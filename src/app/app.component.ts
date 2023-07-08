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
  approvalPendingList: any = [];
  currentUser: any;
  moduleAccess: any = [];

  module_ids: any[] = [];
  responseData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    //for module access
    const getModuleAccess = sessionStorage.getItem('moduleAccess');
    if (getModuleAccess) {
      this.responseData = JSON.parse(getModuleAccess);

      if (this.responseData && this.responseData.message === 'success') {
        this.module_ids = this.responseData.module_ids;
      }
    }
  }// end of ngOnInit

  toggleSubMenu(module: any) {
    module.showSubMenu = !module.showSubMenu;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('moduleAccess');
    this.router.navigate(['/login']);
  }

  
}
