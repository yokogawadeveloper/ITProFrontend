import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approvallistdetails',
  templateUrl: './approvallistdetails.page.html',
  styleUrls: ['./approvallistdetails.page.scss'],
})



export class ApprovallistdetailsPage implements OnInit {
  approvalDataById: any;
  approvalForm!: FormGroup;
  private apiUrl: string = environment.apiUrl; //main url


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService

  ) {
    this.approvalForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      let sequence = params.get('sequenceId');
      this.fetchApprovalDetails(id, sequence);
    });// end of route.paramMap.subscribe
  }

  fetchApprovalDetails(_id: any, _sequence: any) {
    let id = parseInt(_id);
    let sequence = parseInt(_sequence);
    if (id && sequence) {
      const _baseUrl = this.apiUrl + '/approval/approvalDetailsList';
      const _url = `${_baseUrl}/?procurementId=${id}&sequenceId=${sequence}`;
      this.http.get(_url).subscribe((res: any) => {
        if (res) {
          this.approvalDataById = res;
          // console.log(this.approvalDataById);
        }
      }
      );
    }
    else {
      console.log('id or sequence is null');
    }
  } // end of fetchApprovalDetails


  updateApprovalStatus() {
    if (this.approvalForm.valid) {
      let procurementId = this.approvalDataById.procurementId;
      let sequenceId = this.approvalDataById.sequence;
      let userData = JSON.parse(sessionStorage.getItem('currentUser')!)
      // check if procurementId and sequenceId is not null
      if (procurementId && sequenceId && userData.access) {
        const baseUrl = this.apiUrl + '/approval/approvalUpdateStatus';
        const url = `${baseUrl}/?procurementId=${procurementId}&sequenceId=${sequenceId}`;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData.access}` }) };
        // PUT request to update approval status
        this.http.put(url, this.approvalForm.value, httpOptions).subscribe(async (res: any) => {
          if (res) {
            this.toast.success({
              detail: 'Approval status updated successfully',
              position: 'bottom-right',
              duration: 3000,
              type: 'success'
            });
            this.router.navigate(['/approvallist']);
          }
        }, async (error: any) => {
          if (error) {
            this.toast.error({
              detail: error.error.error,
              position: 'bottom-right',
              duration: 3000,
              type: 'danger'
            })
            this.router.navigate(['/approvallist']);
          }
        });
      } else {
        console.log('procurementId or sequenceId is null');
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
