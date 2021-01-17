import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUser } from '../models/auth-user';
import { LocalStorageKeys } from '../../core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;

  constructor(private http: HttpClient, private appConfig: AppConfig) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(
      JSON.parse(localStorage.getItem(LocalStorageKeys.CurrentUser))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    return this.http
      .post<AuthUser>(`${this.appConfig.serviceBase}ApplicationUser/Login`, {
        userName,
        password
      })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem(LocalStorageKeys.CurrentUser, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  sendPasswordResetEmailToUser(emailAddress: string) {
    return this.http
      .post<boolean>(`${this.appConfig.serviceBase}ApplicationUser/SendPasswordResetEmailToUser`, { emailAddress });
  }

  resetPassword(password: string, token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .post<boolean>(`${this.appConfig.serviceBase}ApplicationUser/ResetPassword`, { password }, { headers });
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.CurrentUser);
    localStorage.removeItem(LocalStorageKeys.SelectedDomin);
    this.currentUserSubject.next(null);
  }
}
