import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.page.html',
  styleUrls: ['./modification.page.scss'],
})
export class ModificationPage implements OnInit {
  modificationData = [
    {
      title: 'Modification 1',
      description: 'Description 1',
      image: 'assets/images/1.jpg',
      status : 'Pending'
    },
    {
      title: 'Modification 2',
      description: 'Description 2',
      image: 'assets/images/2.jpg',
      status : 'Pending'
    },
  ];

  constructor() { }

 

  ngOnInit() {
    
  }

}
