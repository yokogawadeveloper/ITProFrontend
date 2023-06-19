import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private apiUrl: string = environment.apiUrl; //main url

  constructor(private http: HttpClient, private router: Router) { }

 
  getApprovalPendingList(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/approval/approvalPendingList/', { headers });

    } else {
      return new Observable<any>((observer) => observer.error("Data for Approval Pending List not found"));
    }
  }// getApprovalPendingList


  getApprovalProcurementDetailsByID(id: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/approval/approvalProcurementDetails/' + id + '/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Approval Procurement Details not found"));
    }
  }// getApprovalProcurementDetailsByID
}
