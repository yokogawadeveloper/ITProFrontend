import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {

  // variables
  procurementData: any = [];

  constructor(private apiService: ApiService, private router: Router) {
   }


  ngOnInit() {
    this.apiService.getProcurementData().subscribe((res) => {
      this.procurementData = res;
    }, (err) => {
      console.log(err);
    });
  }// end of ngOnInit


  redirectToProcurementDetails(dataId: string) {
    this.router.navigate(['/procurementdetails', dataId]);
    console.log(dataId);
  }
}










