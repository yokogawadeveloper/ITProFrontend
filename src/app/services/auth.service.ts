import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// httpOptions is used to set the headers for the HTTP requests.
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient , private router:Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, { username, password }, httpOptions)
      .pipe(map(user => {
        if (user && user.access) {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  } // login

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  } // logout

  isAuthenticated(): boolean{
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData && userData.access) {
      return true;
    }
    else {
      return false;
    }
  }

  getUserProfile() {
    let userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (userData) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userData.access);
      return this.http.get(this.apiUrl + `user-profile/`, { headers });
    }
    else {
      console.log("no user data");
      return null;
    }
  }

  
}
