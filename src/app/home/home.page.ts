import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  getcurrentUser: any;

  
  constructor() { }

  ngOnInit() {

    const getcurrentUser = sessionStorage.getItem('currentUser');
    if (getcurrentUser) {
      this.getcurrentUser = JSON.parse(getcurrentUser);
    }

   }


}
