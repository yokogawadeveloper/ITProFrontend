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

  // Create Procurement Data
  createProcurement(formattedData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.post(this.apiUrl + '/masterprocurement/', formattedData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }

  createMoreAttachment(uploadData: any): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.post(this.apiUrl + '/moreattachments/', uploadData, { headers });
    } else {
      console.log("no user data");
      return new Observable<any>((observer) => observer.error("No user data"));
    }
  }


  // Get Procurement Data
  getLoggedUserProcurementData(): Observable<any> {
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


  // Get Procurement Data for Modification
  getLoggedUserModificationList(): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/masterprocurement/getmodificationlist/', { headers });

    }
    else {
      return new Observable<any>((observer) => observer.error("Data for Modification not found"));
    }
  }

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



}// End of Class
