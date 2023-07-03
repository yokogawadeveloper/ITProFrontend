import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


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

  autoLogin(): void {
    if (this.isLoggedIn()) {
      let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
      if (userData && userData.access) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/login']);
      }
    }
  }// autoLogin


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



}
