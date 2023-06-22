import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  procurementData: any = []; // Add appropriate values

  fileNames: string[] = [];


  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      requestType: 'New Hire',
      name: ['', Validators.required],
      department: ['', Validators.required],
      isExpenditure: ['', Validators.required],
      totalBudget: [''],
      utilizedBudget: [''],
      remarks: [''],
      additionalAttachments: this.formBuilder.array([]),
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
      quantity: ['1', Validators.required],
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

  //get file list with name and title

  get additionalAttachments(): FormArray {
    return this.myForm.get('additionalAttachments') as FormArray;
  }

  handleFileChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.item(0);
    this.fileNames[index] = file ? file.name : '';
    this.additionalAttachments.at(index).setValue(file);
    
  }

  addAttachmentField() {
    this.additionalAttachments.push(this.formBuilder.control(''));
    
  }

  

  removeAttachmentField(index: number) {
    this.additionalAttachments.removeAt(index);
    this.fileNames.splice(index, 1);
  }
  // Getters for form controls
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Submission',
      message: 'Are you sure you want to submit the form?',
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
    if (this.myForm.valid) {
      const formattedData = {
        RequestType: this.myForm.value.requestType,
        Name: this.myForm.value.name,
        Department: this.myForm.value.department,
        IsExpenditure: this.myForm.value.isExpenditure,
        TotalBudget: this.myForm.value.totalBudget,
        UtilizedBudget: this.myForm.value.utilizedBudget,
        Remarks: this.myForm.value.remarks,
        inlineitem: this.myForm.value.rows.map((row: any) => ({
          category: row.category,
          item: row.item,
          costcenter: row.costCenter,
          quantity: row.quantity,
        })),
      };
      this.apiService.postMasterProcurementData(formattedData).subscribe((res: any) => {
        if (res) {
          // Update procurementData array with the newly retrieved data
          this.apiService.getProcurementData().subscribe((res: any) => {
            this.procurementData = res;
            this.router.navigate(['/procurementview']);
          },

            (err: any) => {
              this.toast.error({
                detail: 'OOPS !Something went wrong',
                position: 'bottom-right',
                duration: 3000,
                type: 'danger'
              })
            }
          );

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
  } //end of submitForm

}


