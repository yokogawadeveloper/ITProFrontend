import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {

  procurementData: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;

  constructor(private apiService: ApiService, private router: Router) {
  }


  ngOnInit() {
    this.apiService.getProcurementData().subscribe((res) => {
      this.procurementData = res;
      // console.log(this.procurementData);
    }, (err) => {
      console.log(err);
    });
  }// end of ngOnInit

  redirectToProcurementDetails(dataId: string) {
    this.router.navigate(['/procurementdetails', dataId]);
  }

  getPageData() {
    this.totalPages = Math.ceil(this.procurementData.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.procurementData.slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}










