import { Component, OnInit,} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { AttachmentmodalComponent } from '../attachmentmodal/attachmentmodal.component';

@Component({
  selector: 'app-newhireform',
  templateUrl: './newhireform.component.html',
  styleUrls: ['./newhireform.component.scss'],
})


export class NewhireformComponent implements OnInit {
  myForm!: FormGroup;
  formSubmitted: boolean = false;
  departmentDropdown: any[] = [];
  categoryDropdown: any[] = [];
  itemDropdown: any[] = [];
  costCenterdropdown: any[] = [];
  procurementData: any = [];
  uploadedFiles: File[] = []; //for file upload from modal


  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
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
      additionalAttachments: this.formBuilder.array([]),
    });
    this.addRow();

    this.apiService.getDepartmentDropdownData().subscribe((res: any) => {
      this.departmentDropdown = res;
    });

    this.apiService.getCategoryDropdownData().subscribe((res: any) => {
      this.categoryDropdown = res;
    }
    );

    this.apiService.getItemDropdownData().subscribe((res: any) => {
      this.itemDropdown = res;
    }
    );

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
      unitPrice: ['', Validators.required],
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

  // Total Price Calculation
  populateUnitPrice(event: any, index: number) {
    const selectedItem = event.target.value;
    // Find the selected item in your itemDropdown array or fetch it from an API
    const selectedOption = this.itemDropdown.find(option => option.ItemName === selectedItem);
    // Update the unit price for the corresponding row index
    if (selectedOption) {
      const unitPrice = this.rows.at(index).get('unitPrice');
      if (unitPrice) {
        unitPrice.setValue(selectedOption.UnitPrice);
      }

    }
  }

  calculateTotal(): number {
    const rowsArray = this.myForm.get('rows') as FormArray;
    let total = 0;

    rowsArray.controls.forEach(row => {
      const quantity = row.get('quantity')?.value;
      const unitPrice = row.get('unitPrice')?.value;
      const rowTotal = quantity * unitPrice;
      total += rowTotal;
    });

    return total;
  }

  get total(): number {
    return this.calculateTotal();
  }

  // File Upload Modal
  async openModal() {
    const modal = await this.modalController.create({
      component: AttachmentmodalComponent,
      componentProps: {
        attachments: this.uploadedFiles
      }
    });
    await modal.present();
  }


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



  // Submit Form
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
          unitprice: row.unitPrice,
          totalprice: row.quantity * row.unitPrice
        })),
      };
      this.apiService.postMasterProcurementData(formattedData).subscribe((res: any) => {
        if (res) {
          //more attachment
          const formData = new FormData();
          formData.append('procurement_id', res.id);
          for (let i = 0; i < this.uploadedFiles.length; i++) {
            formData.append('attachment', this.uploadedFiles[i]);
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
    } else {
      this.toast.error({
        detail: 'Please fill all the required fields',
        position: 'bottom-right',
        duration: 3000,
        type: 'danger'
      })
    }
  } //end of submitForm



}









