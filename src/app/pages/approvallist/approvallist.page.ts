import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalService } from 'src/app/services/approval.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-approvallist',
  templateUrl: './approvallist.page.html',
  styleUrls: ['./approvallist.page.scss'],
})
export class ApprovallistPage implements OnInit {


  approvalPendingList: any = [];

  constructor(private router: Router, private approverService: ApprovalService) { }

  ngOnInit() {
    this.approverService.getApprovalPendingList().pipe(
      map((response: any) => response.map((item: any) => item.procurementId))
    ).subscribe((procurementIds: any[]) => {
      // console.log(procurementIds);
      this.approvalPendingList = procurementIds;
    });

  }// end of ngOnInit

  redirectToApprovalListDetails(dataId: string) {
    this.router.navigate(['/approvallistdetails', dataId]);
    console.log(dataId);
  }
}


