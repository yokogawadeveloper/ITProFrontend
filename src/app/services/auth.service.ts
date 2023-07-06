import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


// httpOptions 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setIsApprover(isApprover: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl: string = environment.apiUrl; //main url

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, { username, password }, httpOptions)
      .pipe(map(user => {
        if (user && user.access) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  } // login

  isLoggedIn(): boolean {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      return true;
    }
    else {
      return false;
    }
  }// isLoggedIn


  getUserprofile(): any {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/accounts/userprofile/', { headers });
    }
    else {
      return null;
    }
  }// getUserprofile


  getAuthenticationsApprovals(): any {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${userData.access}`);
      return this.http.get(this.apiUrl + '/approval/approvalAuth/', { headers });
    }
    else {
      return null;
    }
  }// getAuthenticationsApprovals


  //get module access list

  getModuleAccessList(jdata: string): Observable<any> {
    const url = `${this.apiUrl}/getmoduleaccess/getModuleAccess/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(url, jdata, { headers });

  }




}
