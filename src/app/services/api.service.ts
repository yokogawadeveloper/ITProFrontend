import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getDepartmentDropdownData(): Observable<any> {
    return this.http.get(this.apiUrl + '/masterdepartment/');
  }

  getCostCenterDropdownData(): Observable<any> {
    return this.http.get(this.apiUrl + '/mastercostcenter/');
  }

 getCategoryDropdownData(): Observable<any> {
    return this.http.get(this.apiUrl + '/mastercategory/');
 }

  getItemDropdownData(): Observable<any> {
    return this.http.get(this.apiUrl + '/masteritem/');
  }

  
  //procurement form data send api with authtication header
  
  postProcurementData(formData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.post(this.apiUrl + '/masterprocurement/', formData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }


  getProcurementData(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Procurement not found"));
    }
  }

  getProcurementDataById(id: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/' + id + '/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Procurement Details not found"));
    }
  }


  postMasterProcurementData(formattedData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
   if (userData && userData.access) {
     const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
     return this.http.post(this.apiUrl + '/masterprocurement/', formattedData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
      }
  }

  
}
