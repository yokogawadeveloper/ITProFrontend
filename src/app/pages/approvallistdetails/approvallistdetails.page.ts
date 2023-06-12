import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from 'src/app/services/approval.service';
import { FormGroup,FormBuilder ,Validators  } from '@angular/forms';



@Component({
  selector: 'app-approvallistdetails',
  templateUrl: './approvallistdetails.page.html',
  styleUrls: ['./approvallistdetails.page.scss'],
})
export class ApprovallistdetailsPage implements OnInit {
  approvalDataById: any;
  approvalForm!: FormGroup;

  constructor(
    private route : ActivatedRoute ,
    private formBuilder: FormBuilder,
    private approvalService: ApprovalService

    ) {
    this.approvalForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchApprovalDetails(id);
    });//get id from url
  }

  fetchApprovalDetails(id: any) {
    this.approvalService.getApprovalProcurementDetailsByID(id).subscribe((res) => {
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

  updateApprovalStatusById(id: any) {
    
  }
}
