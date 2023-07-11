import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.page.html',
  styleUrls: ['./procurement.page.scss'],
})
export class ProcurementPage implements OnInit {

  //forms
  formType: string = 'NewHire';
  selectedForm: string | undefined;

  NewHire: FormGroup;
  Replacement: FormGroup;
  TemporaryArrangements: FormGroup;
  StockManagement: FormGroup;
  //other
  rows: any = [];
  currentUser: any;

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
  }


  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    
  }


}//end of class
