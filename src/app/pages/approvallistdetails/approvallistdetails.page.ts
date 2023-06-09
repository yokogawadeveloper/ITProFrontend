import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder ,Validators  } from '@angular/forms';



@Component({
  selector: 'app-approvallistdetails',
  templateUrl: './approvallistdetails.page.html',
  styleUrls: ['./approvallistdetails.page.scss'],
})
export class ApprovallistdetailsPage implements OnInit {
  approvalDataById: any;
  approvalForm!: FormGroup;

  constructor(private apiService: ApiService,private route : ActivatedRoute ,private formBuilder: FormBuilder) {
    this.approvalForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchApprovalDetails(id);
    });
  }

  fetchApprovalDetails(id: any) {
    this.apiService.getProcurementDataById(id).subscribe((res) => {
      console.log(res);
      this.approvalDataById = res;
    });
  }

  updateApprovalStatus() {
    if (this.approvalForm.valid) {
      // Perform form submission logic here
      console.log(this.approvalForm.value); // Example: log form values
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
}
