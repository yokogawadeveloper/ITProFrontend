import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from 'src/app/services/approval.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { id } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-approvallistdetails',
  templateUrl: './approvallistdetails.page.html',
  styleUrls: ['./approvallistdetails.page.scss'],
})
export class ApprovallistdetailsPage implements OnInit {
  approvalDataById: any;
  approvalForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient

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
    }
    );
  }

  fetchApprovalDetails(_id: any, _sequence: any) {
    let id = parseInt(_id);
    let sequence = parseInt(_sequence);
    // console.log(id);
    // console.log(sequence);
    if (id && sequence) {
      const _baseUrl = 'http://127.0.0.1:8000/approval/approvalDetailsList';
      const _url = `${_baseUrl}/?procurementId=${id}&sequenceId=${sequence}`;

      this.http.get(_url).subscribe((res: any) => {
        if (res) {
          this.approvalDataById = res;
          console.log(this.approvalDataById);
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
      // Check if procurementId and sequenceId are not null
      if (procurementId && sequenceId) {
        const baseUrl = 'http://127.0.0.1:8000/approval/approvalUpdateStatus';
        const url = `${baseUrl}/?procurementId=${procurementId}&sequenceId=${sequenceId}`;

        this.http.put(url, this.approvalForm.value).subscribe(async (res: any) => {
          if (res) {
            const alert = await this.alertCtrl.create({
              header: 'Success',
              message: 'Approval Status Updated',
              buttons: ['OK']
            });
            await alert.present();
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
