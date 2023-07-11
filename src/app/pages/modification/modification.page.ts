import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.page.html',
  styleUrls: ['./modification.page.scss'],
})
export class ModificationPage implements OnInit {
  userProcurementModifiedList: any = [];

  constructor(private apiServie: ApiService, private router: Router) { }



  ngOnInit() {
    this.apiServie.getLoggedUserModificationList().subscribe((response: any) => {
      this.userProcurementModifiedList = response;
    },
      (error: any) => {
        console.log(error);
      });
  } // End of ngOnInit


  redirectToUpdateModification(dataId: string) {
    this.router.navigate(['/updatemodification', dataId]);
  }// End of redirectToUpdateModification

}
