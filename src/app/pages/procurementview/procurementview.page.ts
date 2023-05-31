import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  data = [
    { Name: 'John', Gender: 'Male', Age: 25 },
    { Name: 'Jane', Gender: 'Female', Age: 30 },
    // more data rows...
  ];

  filteredData = [...this.data];
  columns = [
    { prop: 'Name' },
    { prop: 'Gender' },
    { prop: 'Age' },
  ];

  searchTerm = '';

  filterData() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredData = this.data.filter((row) => {
      return (
        row.Name.toLowerCase().includes(searchTerm) ||
        row.Gender.toLowerCase().includes(searchTerm) ||
        row.Age.toString().includes(searchTerm)
      );
    });
  }

  performAction() {
    // Add your action logic here
  }

}
