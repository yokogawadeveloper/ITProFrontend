import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-procurementdetails',
  templateUrl: './procurementdetails.page.html',
  styleUrls: ['./procurementdetails.page.scss'],
})
export class ProcurementdetailsPage implements OnInit {
  procurementDataById: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchProcurementDetails(id);
    });
  }

  fetchProcurementDetails(id: any) {
    this.apiService.getProcurementDataById(id).subscribe((res) => {
      console.log(res);
      this.procurementDataById = res;
    });
  }

  back() {
    window.history.back();
  }

}
