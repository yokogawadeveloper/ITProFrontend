import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  procurementData: any = [];
  statusFilter: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getProcurementData().subscribe(
      (res) => {
        this.procurementData = res;
        this.calculateTotalPages();
      },
      (err) => {
        console.log(err);
      }
    );
    this.filterItems();
  }//end ngOnInit
  

  redirectToProcurementDetails(dataId: string) {
    this.router.navigate(['/procurementdetails', dataId]);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.procurementData.length / this.itemsPerPage);
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

  getPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.procurementData.slice(startIndex, endIndex);
  }

  // Inside your component class
  // filterItems() {
  //   if (!this.statusFilter) {
  //     // If the filter is empty, show all items
  //     this.procurementData = this.getPageItems();
  //   } else {
  //     // Filter the items based on the entered text
  //     const searchText = this.statusFilter.toLowerCase();
  //     this.procurementData = this.getPageItems().filter((data: { Status: string; RequestNumber: string; RequestType: string; Name: string; }) =>
  //       data.Status.toLowerCase().includes(searchText) ||
  //       data.RequestNumber.toLowerCase().includes(searchText) ||
  //       data.RequestType.toLowerCase().includes(searchText) ||
  //       data.Name.toLowerCase().includes(searchText)
  //     );
  //   }
  // }

  filterItems() {
    if (!this.statusFilter) {
      // If the filter is empty, show all items
      this.procurementData = this.getPageItems();
    } else {
      // Filter the items based on the entered status
      const searchText = this.statusFilter.toLowerCase();
      this.procurementData = this.getPageItems().filter((data: { Status: string; Name: string}) =>
        data.Status.toLowerCase().includes(searchText) ||
        data.Name.toLowerCase().includes(searchText)
      );
    }
  }

}
