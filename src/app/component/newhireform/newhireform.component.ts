import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-newhireform',
  templateUrl: './newhireform.component.html',
  styleUrls: ['./newhireform.component.scss'],
})
export class NewhireformComponent implements OnInit {

  department!: string;
  isExpenditure: boolean = false;
  totalBudget!: number;
  utilizedBudget!: number;
  upload: any;
  comment!: Text;
  rows: any = []
  //for dropdown
  DepartmentdropdownOptions: any = [];
  CostCenterdropdownOptions: any = [];
  selectedUserType: string | undefined;   
  constructor() { }

  ngOnInit(): void {
    this.rows = [{
      name: '',
      category: '',
      item: '',
      quantity: '',
    }]
  


    this.DepartmentdropdownOptions = [
      { id: 1, value: 'Department 1' },
      { id: 2, value: 'Department 2' },
      { id: 3, value: 'Department 3' },
      { id: 4, value: 'Department 4' },
      { id: 5, value: 'Department 5' },
    ];

    this.CostCenterdropdownOptions = [
      { id: 1, value: 'Cost Center 1' },
      { id: 2, value: 'Cost Center 2' },
      { id: 3, value: 'Cost Center 3' },
      { id: 4, value: 'Cost Center 4' },
    ];

  }

  addRow() {
    this.rows.push({
      name: '',
      category: '',
      item: '',
      quantity: '',
    });
  }


  deleteRow(index: any) {
    if (this.rows.length == 1) {
      alert("Atleast one row should be there")
    }
    else {
      this.rows.splice(index, 1)
    }
  }


  submit() {
    const formData = {
      department: this.department,
      isExpenditure: this.isExpenditure,
      totalBudget: this.totalBudget,
      utilizedBudget: this.utilizedBudget,
      upload: this.upload,
      comment: this.comment,
      rows: this.rows,
    };
    console.log(formData);
  }

}