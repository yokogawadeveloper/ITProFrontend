import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

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
  }//end of postProcurementData


  getProcurementData(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Procurement not found"));
    }
  }//Get current user procurement data

  getProcurementDataById(id: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/' + id + '/', { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Procurement Details not found"));
    }
  }//Get current user procurement data in details page


  postMasterProcurementData(formattedData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.post(this.apiUrl + '/masterprocurement/', formattedData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }//create master procurement data


  postAttachment(uploadData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.post(this.apiUrl + '/moreattachments/', uploadData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }//create More attachments








  getModificationData(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/modifiedprocurementlist/', { headers });

    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Modification not found"));
    }
  }//end of getModificationData for current user

  updateModificationProcurementData(id: any, formattedData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.put(this.apiUrl + '/masterprocurement/' + id + '/', formattedData, { headers });
    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Modification not found"));
    }
  }

}
