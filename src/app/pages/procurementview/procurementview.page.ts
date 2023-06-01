import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {

  procurementData:any = [];
  isAlertOpen = false;
  public alertButtons = ['OK'];
  constructor(private apiService:ApiService) { }

  

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  ngOnInit() {

    this.apiService.getProcurementData().subscribe((res) => {
      console.log(res);
      this.procurementData = res;
      console.log(this.procurementData);
    }, (err) => {
      console.log(err);
    });
  }
  

}



  



  


