import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-stockmanagementform',
  templateUrl: './stockmanagementform.component.html',
  styleUrls: ['./stockmanagementform.component.scss'],
})



export class StockmanagementformComponent implements OnInit {
  myForm!: FormGroup;
  formSubmitted: boolean = false;
  departmentDropdown: any[] = [];
  categoryDropdown: any[] = [];
  itemDropdown: any[] = [];
  costCenterdropdown: any[] = [];
  procurementData: any = [];
  attachmentCover !: File;


  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router
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
      rows: this.formBuilder.array([]),
      attachments: this.formBuilder.array([]),
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


  

  get attachments() {
    return this.myForm.get('attachments') as FormArray;
  }

  addMoreAttachments() {
    const attachmentControl = new FormControl(null);
    this.attachments.push(attachmentControl);
  }

  onAttachmentUpload(event: any, index: number) {
    const file = event.target.files[0];
    const attachmentControl = this.attachments.controls[index] as FormControl;
    attachmentControl.setValue(file);

    // Set the file name in the corresponding input field
    const fileNameInput = document.getElementById(`attachment${index}`) as HTMLInputElement;
    if (fileNameInput) {
      fileNameInput.value = file ? file.name : '';
    }
  }

  
  

//Submit form
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
    // console.log(this.myForm.value);
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
          const attachments = this.myForm.value.attachments.filter((attachment: File) => attachment !== null);
          const formData = new FormData();
          formData.append('procurement_id', res.id);
          for (let i = 0; i < attachments.length; i++) {
            formData.append('attachment', attachments[i], attachments[i].name);
          }
          this.apiService.postAttachment(formData).subscribe((res: any) => {
            if (res) {
              this.toast.success({
                detail: 'Application submitted successfully',
                position: 'bottom-right',
                duration: 3000,
                type: 'success'
              });
              this.router.navigate(['/procurementview']);
            }
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
      console.log(this.myForm.value);


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