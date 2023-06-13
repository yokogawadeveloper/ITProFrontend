import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private apiUrl = 'http://127.0.0.1:8000/approval/';

  constructor(private http: HttpClient , private router:Router) { }

  //Getapprovalpendinglist
  getApprovalPendingList(): Observable<any>{
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if(userData && userData.access){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + 'approvalPendingList/', {headers});
      
    }else{
      return new Observable<any>((observer) => observer.error("Data for Approval Pending List not found"));
    }
  }


  getApprovalProcurementDetailsByID(id: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + 'approvalProcurementDetails/' + id + '/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Approval Procurement Details not found"));
    }
  }

  
}
