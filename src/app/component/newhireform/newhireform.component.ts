import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  attachment!: File;  //for file upload


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
      Files: File,
      inlineitem: this.formBuilder.array([]),
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
    return this.myForm.get('inlineitem') as FormArray;
  }

  addRow() {
    const inlineitemsRows = this.formBuilder.group({
      category: ['', Validators.required],
      item: ['', Validators.required],
      costCenter: ['', Validators.required],
      quantity: ['1', Validators.required],
    });
    this.rows.push(inlineitemsRows);
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

  FileUploadChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.attachment = event.target.files[0];
    }
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
    const formateData = {
      inlineitem: this.myForm.get('inlineitem')?.value
    }

    if (this.myForm.valid) {
      const formData = new FormData();



      formData.append('RequestType', this.myForm.get('requestType')?.value);
      formData.append('Name', this.myForm.get('name')?.value);
      formData.append('Department', this.myForm.get('department')?.value);
      formData.append('IsExpenditure', this.myForm.get('isExpenditure')?.value);
      formData.append('TotalBudget', this.myForm.get('totalBudget')?.value);
      formData.append('UtilizedBudget', this.myForm.get('utilizedBudget')?.value);
      formData.append('Remarks', this.myForm.get('remarks')?.value);
      formData.append('Files', this.attachment);



      const inlineItems = this.myForm.get('inlineitem') as FormArray;
      //  get category data from form array

      



      for (let i = 0; i < inlineItems.length; i++) {
        const row = inlineItems.at(i) as FormGroup;
        formData.append(`inlineitem[${i}][category]`, row.get('category')?.value);
        formData.append(`inlineitem[${i}][item]`, row.get('item')?.value);
        formData.append(`inlineitem[${i}][costCenter]`, row.get('costCenter')?.value);
        formData.append(`inlineitem[${i}][quantity]`, row.get('quantity')?.value);
      }
      
      this.apiService.postMasterProcurementData(formData).subscribe((res: any) => {
        console.log(res);
        this.toast.success({
          detail: 'Form submitted successfully',
          position: 'bottom-right',
          duration: 3000,
          type: 'success'
        })
        this.router.navigate(['/home']);
      }, (err: any) => {
        console.log(err);
        this.toast.error({
          detail: 'OOPS !Something went wrong',
          position: 'bottom-right',
          duration: 3000,
          type: 'danger'
        })
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


