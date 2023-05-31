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
    return this.http.get('http://127.0.0.1:8000/mastercostcenter/');
  }

 getCategoryDropdownData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/mastercategory/');
 }

  getItemDropdownData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/masteritem/');
  }


  //procurement form data send api with authtication header
  
  postProcurementData(formData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      console.log("user data");
      return this.http.post('http://127.0.0.1:8000/masterprocurement/', formData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }


  getProcurementData(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    return this.http.get('http://127.0.0.1:8000/masterprocurement/');
  }

}
