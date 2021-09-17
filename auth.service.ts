import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem('jwtToken', jwt);
  }

  private storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/UserProfileManagement/RefreshToken`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.item.jwtToken);
      this.storeRefreshToken(tokens.item.refreshToken);
    }));
  }
}
