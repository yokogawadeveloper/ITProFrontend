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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  //sorting
  sortColumn: string = '';
  sortDirection: string = 'asc';
  statusFilter: string = '';

  constructor(
    private router: Router,
    private approverService: ApprovalService
  ) { }

  ngOnInit() {
    this.approverService.getApprovalPendingList().pipe(
      map((response: any) => response.map((item: any) => item.procurementId))
    ).subscribe((procurementIds: any[]) => {
      this.approvalPendingList = procurementIds;
      console.log(this.approvalPendingList);
      this.calculateTotalPages();
    });
    this.filterItems();

  }// end of ngOnInit

  redirectToApprovalListDetails(id: number, sequence: number) {
    this.router.navigate(['/approvallistdetails', id, sequence]);

  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.approvalPendingList.length / this.itemsPerPage);
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
    let sortedItems = this.approvalPendingList.sort((a: any, b: any) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];
      if (this.sortColumn === 'Request No') {
        valA = parseInt(valA);
        valB = parseInt(valB);
      }
      if (valA < valB) {
        return -1;
      }
      else if (valA > valB) {
        return 1;
      }
      else {
        return 0;
      }


    });
    if (this.sortDirection === 'desc') {
      sortedItems = sortedItems.reverse();
    }
    let pageItems = sortedItems.slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage) * this.itemsPerPage);
    return pageItems;

  }

  filterItems() {
    if (!this.statusFilter) {
      this.approvalPendingList = this.getPageItems();
    } else {
      // Filter the items based on the entered status
      const searchText = this.statusFilter.toLowerCase();
      this.approvalPendingList = this.getPageItems().filter((data: { Status: string; Name: string }) =>
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




}// end of class