import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDepartmentDropdownData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/masterdepartment/');
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


  //procurement form data send api
  postProcurementData(formData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/masterprocurement/', formData);
  }

}
