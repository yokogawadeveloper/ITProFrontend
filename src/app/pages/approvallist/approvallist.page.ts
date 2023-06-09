import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvallist',
  templateUrl: './approvallist.page.html',
  styleUrls: ['./approvallist.page.scss'],
})
export class ApprovallistPage implements OnInit {


  approvalData: any = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProcurementData().subscribe((res) => {
      this.approvalData = res;
    }, (err) => {
      console.log(err);
    });
  }// end of ngOnInit

  redirectToApprovalListDetails(dataId: string) {
    this.router.navigate(['/approvallistdetails', dataId]);
    console.log(dataId);
  }
}


