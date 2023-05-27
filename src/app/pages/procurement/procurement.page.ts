import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import newhireform component
import { NewhireformComponent } from 'src/app/component/newhireform/newhireform.component'

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
      department: ['', Validators.required],
      isexpenditure: ['', Validators.required],
      totalbudget : ['', Validators.required],
      utilizedbudget : ['', Validators.required],
      upload : ['', Validators.required],
      comment: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
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
    this.rows = [{ name: '', category: '', item: '', quantity: '', }]
  }
  addRow() {
    if (this.rows.length < 5) {
      this.rows.push({
        name: '',
        category: '',
        item: '',
        quantity: '',
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


  //newHireSubmit()

  newHireSubmit() {
    console.log(this.NewHire.value)
  }






}
