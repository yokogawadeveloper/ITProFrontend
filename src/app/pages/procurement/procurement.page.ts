import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.page.html',
  styleUrls: ['./procurement.page.scss'],
})
export class ProcurementPage implements OnInit {

  //forms
  formType: string | undefined;
  selectedForm: string | undefined;

  NewHire: FormGroup;
  Replacement: FormGroup;
  TemporaryArrangements: FormGroup;
  StockManagement: FormGroup;




  //other
  rows: any = [];

  constructor(private formBuilder: FormBuilder) {

    this.NewHire = this.formBuilder.group({
      // Form 1 controls and validators
    });

    this.Replacement = this.formBuilder.group({
      // Form 2 controls and validators
    });

    this.TemporaryArrangements = this.formBuilder.group({
      // Form 3 controls and validators
    });

    this.StockManagement = this.formBuilder.group({
      // Form 4 controls and validators
    });
  }

  handleFormTypeChange() {
    if (this.formType == "NewHire") {
      this.selectedForm = "NewHire";
    }
    else if (this.formType == "Replacement") {
      this.selectedForm = "Replacement";
    }
    else if (this.formType == "TemporaryArrangements") {
      this.selectedForm = "TemporaryArrangements";
    }
    else if (this.formType == "StockManagement") {
      this.selectedForm = "StockManagement";
    }
    console.log(this.formType)

  }


  ngOnInit() {
    this.rows = [{
      name: '',
      category: '',
      item : '',
      quantity: '',
    }]
  }


  // form validation for form 1
  addRow() {
    // only add 5 rows at a time otherwise it will take time to load
    if (this.rows.length < 5) {
      this.rows.push({
        name: '',
        email: '',
        mobno: ''
      })
    }
    else {
      alert("You can add only 5 rows at a time")
    }
  }

  deleteRow(index: any) {

    if (this.rows.length == 1) {
      alert("Atleast one row should be there")
    }
    else {
      this.rows.splice(index, 1)
    }
  }






}
