import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalService } from 'src/app/services/approval.service';

@Component({
  selector: 'app-approvallist',
  templateUrl: './approvallist.page.html',
  styleUrls: ['./approvallist.page.scss'],
})
export class ApprovallistPage implements OnInit {


  approvalPendingList: any = [];

  constructor(private router: Router, private approverService: ApprovalService) { }

  ngOnInit() {
    this.approverService.getApprovalPendingList().subscribe((response: any) => {
      console.log(response);
      this.approvalPendingList = response;
    });

  }// end of ngOnInit

  redirectToApprovalListDetails(dataId: string) {
    this.router.navigate(['/approvallistdetails', dataId]);
    console.log(dataId);
  }
}


