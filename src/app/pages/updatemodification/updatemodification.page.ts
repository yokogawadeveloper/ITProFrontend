import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { NgToastService } from 'ng-angular-popup';


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
    private apiService: ApiService,
    private alertController: AlertController,
    private toast: NgToastService
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

  }// End of ngOnInit

  get rows() {
    return this.modificationForm.get('rows') as FormArray;
  }// End of get rows

  addRow() {
    const newRow = this.formBuilder.group({
      category: ['', Validators.required],
      item: ['', Validators.required],
      costCenter: ['', Validators.required],
      quantity: ['1', Validators.required],
    });
    this.rows.push(newRow);
  }// End of addRow

  deleteRow(index: number) {
    this.rows.removeAt(index);
  }// End of deleteRow



  // intialize form and populate data
  initializeForm() {
    this.modificationForm = this.formBuilder.group({
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
                category: [row.category],
                item: [row.item],
                costCenter: [row.costcenter],
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

  // Submit form
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Submission',
      message: 'Are you sure you want to submit the Modification form?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmation canceled');
          }
        },
        {
          text: 'Submit',
          handler: () => {
            console.log('Submitting the form...');
            this.submitForm();
          }
        }
      ]
    });
    await alert.present();
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.modificationForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      const formattedData = {
        Name: this.modificationForm.value.name,
        Department: this.modificationForm.value.department,
        isExpenditure: this.modificationForm.value.isExpenditure,
        TotalBudget: this.modificationForm.value.totalBudget,
        UtilizedBudget: this.modificationForm.value.utilizedBudget,
        Remarks: this.modificationForm.value.remarks,
        Status: 'Pending',
        inlineitem: this.modificationForm.value.rows.map((row: any) => ({
          category: row.category,
          item: row.item,
          costcenter: row.costCenter,
          quantity: row.quantity,
        })),
      }
      this.apiService.updateModificationProcurementData(id, formattedData).subscribe(
        (data: any) => {
          this.toast.success({
            detail: 'Modification form submitted successfully',
            position: 'top',
            duration: 3000,
            type: 'success'
          });
          this.router.navigate(['/procurementview']);
        },
        (error: any) => {
          this.toast.error({
            detail: 'Error submitting the form',
            position: 'top',
            duration: 3000,
            type: 'danger'
          });
        }

      )
    }
    else {
      this.toast.info({
        detail: 'Please fill all the required fields',
        position: 'top',
        duration: 3000,
        type: 'info'
      });
    }
  }

}// End of class