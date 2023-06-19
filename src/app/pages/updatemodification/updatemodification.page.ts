import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-updatemodification',
  templateUrl: './updatemodification.page.html',
  styleUrls: ['./updatemodification.page.scss'],
})
export class UpdatemodificationPage implements OnInit {

  modificationForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.populateFormData(); // Call the method to populate the form fields
  }


  initializeForm() {
    this.modificationForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: [''],
      isExpenditure: ['', Validators.required],
      totalBudget: [''],
      utilizedBudget: [''],
      attachment: [''],
      remarks: [''],
      rows: this.formBuilder.array([])
    });
    this.addRow(); // Add one row by default
  }

  get rows() {
    return this.modificationForm.get('rows') as FormArray;
  }

  addRow() {
    const newRow = this.formBuilder.group({
      category: [''],
      item: [''],
      costCenter: [''],
      quantity: ['']
    });
    this.rows.push(newRow);
  }

  deleteRow(index: number) {
    this.rows.removeAt(index);
  }


  populateFormData() {
    // Simulated example with a pre-existing data object
    const existingData = {
      name: 'John Doe',
      department: 'Marketing',
      isExpenditure: 'Yes',
      totalBudget: 5000,
      utilizedBudget: 3000,
      attachment: 'example.pdf',
      remarks: 'Some remarks',
      rows: [
        { category: 'Category A', item: 'Item 1', costCenter: 'Cost Center A', quantity: 2 },
        { category: 'Category B', item: 'Item 2', costCenter: 'Cost Center B', quantity: 3 }
      ]
    };

    // Set the values for the main form controls
    this.modificationForm.patchValue({
      name: existingData.name,
      department: existingData.department,
      isExpenditure: existingData.isExpenditure,
      totalBudget: existingData.totalBudget,
      utilizedBudget: existingData.utilizedBudget,
      attachment: existingData.attachment,
      remarks: existingData.remarks
    });

    // Populate the rows FormArray
    existingData.rows.forEach(row => {
      const newRow = this.formBuilder.group({
        category: [row.category],
        item: [row.item],
        costCenter: [row.costCenter],
        quantity: [row.quantity]
      });
      this.rows.push(newRow);
    });
  }









}