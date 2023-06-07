import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
 
  public userDropdownClicked: boolean = false;
  constructor(private router: Router) {}

  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }// toggleUserDropdown

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  } // logout

  


}
