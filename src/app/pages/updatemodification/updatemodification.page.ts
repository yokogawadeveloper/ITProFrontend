import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-updatemodification',
  templateUrl: './updatemodification.page.html',
  styleUrls: ['./updatemodification.page.scss'],
})
export class UpdatemodificationPage implements OnInit {

  modificationForm!: FormGroup;
  formSubmitted = false;
  categoryDropdown: any[] = []; 
  itemDropdown: any[] = []; 
  costCenterdropdown: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.populateFormData(); // Call the method to populate the form fields
    
    this.apiService.getCategoryDropdownData().subscribe((res: any) => {
      this.categoryDropdown = res;
    }); // Get category dropdown values

    // Get item dropdown values
    this.apiService.getItemDropdownData().subscribe((res: any) => {
      this.itemDropdown = res;
    }
    );
    // Get cost center dropdown values
    this.apiService.getCostCenterDropdownData().subscribe((res: any) => {
      this.costCenterdropdown = res;
    }
    );

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

  


  // Submit handler to log the form value to the console

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

  populateFormData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getProcurementDataById(id).subscribe(
      (data: any) => {
        if (data) {
          this.modificationForm.patchValue({
            name: data.Name,
            department: data.Department,
            isExpenditure: data.isExpenditure,
            totalBudget: data.TotalBudget,
            utilizedBudget: data.UtilizedBudget,
            attachment: data.Attachment,
            remarks: data.Remarks
          });
          // console.log(data.inlineitem)
          // Clear existing rows
          while (this.rows.length !== 0) {
            this.rows.removeAt(0);
          }

          // Populate the rows FormArray
          if (data.inlineitem && data.inlineitem.length > 0) {
            data.inlineitem.forEach((row: any) => {
              const newRow = this.formBuilder.group({
                category: [row.Category],
                item: [row.Item],
                costCenter: [row.CostCenter],
                quantity: [row.quantity]
              });
              this.rows.push(newRow);
            });
          }
        }
        console.log('Form data populated successfully');
      },
      (error: any) => {
        console.log('Error retrieving form data from API:', error);
      }
    );

  }












}