import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../../environments/environment';
import { JwtHelper } from 'angular2-jwt';

import { User } from '../user';
import { Token } from '../token';


@Injectable()
export class AuthService {
  // TODO: 주소 바꿔줄것.
  URL = environment.apiUrl;
  TOKEN_NAME = environment.tokenName;
  USER = 'user';

  thisUser: any;
  subscriber = new Array<Observer<User>>();
  subscriptionObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) {
  }



  // TODO ** set User 부분 ** 변경하기!!!!!!!
  signin(credential): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/login/`, credential)
      .do(res => this.setToken(res.token))
      .do(res => this.setUser(res.user))
      .shareReplay();
  }

  signup(credential): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/member/user/`, credential);
  }


  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  // 토큰으로부터 사용자 아이디 취득
  getUserid(): string {
    // console.log(this.getDecodeToken());
    return this.getDecodeToken().username;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  // getUser(): Observable<User> {
  //   const thisUser = localStorage.getItem(this.USER);
  //   return
  // }

  getUser(): User {
    const user = JSON.parse(localStorage.getItem(this.USER));
    return user;
  }

  setUser(user: any): void {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER);
  }
  // token 유효 기간 체크
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  // 토큰으로부터 사용자 정보 취득
  getDecodeToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }

}