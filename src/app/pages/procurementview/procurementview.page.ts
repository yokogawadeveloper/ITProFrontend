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
  itemsPerPage: number = 10;
  totalPages: number = 0;

  //sorting
  sortColumn: string = ''; // Column name for sorting
  sortDirection: string = 'asc'; // Sort direction: 'asc' or 'desc'

  procurementData: any = [];
  statusFilter: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getLoggedUserProcurementData().subscribe(
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
    let sortedItems = this.procurementData.sort((a: any, b: any) => {
      if (this.sortColumn === 'Request No') {
        let valA = parseInt(a.RequestNumber);
        let valB = parseInt(b.RequestNumber);
        if (valA < valB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valA > valB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      } else {
        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];
        if (valA < valB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valA > valB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.procurementData.slice(startIndex, endIndex) || sortedItems.slice(startIndex, endIndex);


  }

  filterItems() {
    if (!this.statusFilter) {
      // If the filter is empty, show all items
      this.procurementData = this.getPageItems();
    } else {
      // Filter the items based on the entered status
      const searchText = this.statusFilter.toLowerCase();
      this.procurementData = this.getPageItems().filter((data: { Status: string; Name: string }) =>
        data.Status.toLowerCase().includes(searchText) ||
        data.Name.toLowerCase().includes(searchText)
      );
    }
  }

  //sorting
  toggleSortDirection(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }


}
