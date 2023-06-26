import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



// main component class
@Component({
  selector: 'app-replacementform',
  templateUrl: './replacementform.component.html',
  styleUrls: ['./replacementform.component.scss'],
})
export class ReplacementformComponent implements OnInit {
  myForm!: FormGroup;
  formSubmitted: boolean = false;
  departmentDropdown: any[] = [];
  categoryDropdown: any[] = [];
  itemDropdown: any[] = [];
  costCenterdropdown: any[] = [];
  isExpenditure: any;

  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      requestType: 'NewHire',
      name: ['', Validators.required],
      department: ['', Validators.required],
      isExpenditure: ['', Validators.required],
      totalBudget: [''],
      utilizedBudget: [''],
      remarks: [''],
      Files: File // need to check
    });
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
  }// end of ngOnInit


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
      const formData = new FormData();
      for (let i = 0; i < this.myForm.value.Files.length; i++) {
        formData.append("Files", this.myForm.value.Files[i]);
      }
      let formattedData = {
        "RequestType": this.myForm.value.requestType,
        "Name": this.myForm.value.name,
        "Department": this.myForm.value.department,
        "IsExpenditure": this.myForm.value.isExpenditure,
        "TotalBudget": this.myForm.value.totalBudget,
        "UtilizedBudget": this.myForm.value.utilizedBudget,
        "Remarks": this.myForm.value.remarks,
        "Files": formData
      }
      console.log(formattedData);


      // this.apiService.postMasterProcurementData(formattedData).subscribe((res: any) => {
      //   if (res) {
      //     this.router.navigate(['/procurementview']);
      //   }
      // });

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
