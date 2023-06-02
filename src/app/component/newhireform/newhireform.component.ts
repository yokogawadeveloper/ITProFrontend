import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newhireform',
  templateUrl: './newhireform.component.html',
  styleUrls: ['./newhireform.component.scss'],
})

export class NewhireformComponent implements OnInit {

  myForm!: FormGroup;
  formSubmitted: boolean = false;
  departmentDropdown: any[] = []; // Add appropriate values
  categoryDropdown: any[] = []; // Add appropriate values
  itemDropdown: any[] = []; // Add appropriate values
  costCenterdropdown: any[] = []; // Add appropriate values

  constructor(private apiService: ApiService, private toast: NgToastService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      isExpenditure: ['', Validators.required],
      totalBudget: [''],
      utilizedBudget: [''],
      attachment: [''],
      remarks: [''],
      rows: this.formBuilder.array([])
    });
    this.addRow(); // Add one row by default

    // Get department dropdown values
    this.apiService.getDepartmentDropdownData().subscribe((res: any) => {
      this.departmentDropdown = res;
    });

    // Get category dropdown values
    this.apiService.getCategoryDropdownData().subscribe((res: any) => {
      this.categoryDropdown = res;
    }
    );

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
  }//end of ngOnInit

  get rows() {
    return this.myForm.get('rows') as FormArray;
  }

  addRow() {
    const newRow = this.formBuilder.group({
      category: ['', Validators.required],
      item: ['', Validators.required],
      costCenter: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.rows.push(newRow);
  }

  deleteRow(index: number) {
    if (this.rows.length == 1) {
      this.toast.error({
        detail: 'Atleast one row is required',
        position: 'bottom-right',
        duration: 3000,
        type: 'danger'
      })
    } else {
      this.rows.removeAt(index);
    }

  }

  // Getters for form controls
  submitForm() {
    this.formSubmitted = true;
    if (this.myForm.valid) {
      let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
      if (userData && userData.access) {
        const formattedData = {
          Name: this.myForm.value.name,
          DepartmentId: this.myForm.value.department,
          IsExpenditure: this.myForm.value.isExpenditure,
          TotalBudget: this.myForm.value.totalBudget,
          UtilizedBudget: this.myForm.value.utilizedBudget,
          Remarks: this.myForm.value.remarks,
          inlineitem: this.myForm.value.rows.map((row: any) => ({
            category: row.category,
            item: row.item,
            costcenter: row.costCenter,
            quantity: row.quantity,
          }))
        };
        this.apiService.postMasterProcurementData(formattedData).subscribe((res: any) => {
          if (res) {
            this.router.navigate(['/procurementview']);
          }
        });

      } else {
        this.toast.error({
          detail: 'OOPS !Something went wrong',
          position: 'bottom-right',
          duration: 3000,
          type: 'danger'
        })
      }
    } else {
      this.toast.error({
        detail: 'OOPS !New Hire Form is invalid',
        position: 'bottom-right',
        duration: 3000,
        type: 'danger'
      })
    }
  }
}


