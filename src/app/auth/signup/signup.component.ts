import { Component, OnInit, Output, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  styleUrls: ['../login/login.component.scss'],
  template: `
    <div class="centered signup">
        <app-auth-form
          [isSignup]="true"
          [error]="error"
          (submitted)="signupUser($event)" #authForm>
          <h1 class="form-title">회원가입</h1>
          <p class="form-sub">이메일 계정으로 간편하게 오버잇츠 회원이 되세요!</p>
          <span>이미 회원이신가요?</span>
          <a
            class="text-link"
            routerLink="/login">
          로그인
          </a>
          <button
            [disabled]="!authForm.f.valid"
            [class.disabled]="!authForm.f.valid"
            type="submit"
            class="button uber button-fluid">
            회원가입하기
          </button>
          </app-auth-form>
    </div>
  `
})
export class SignupComponent implements OnInit {
  error: boolean;
  isSignup = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {}

  signupUser(event: FormGroup) {
    this.auth.signup(event.value)
      .subscribe(
        () => {
          this.auth.signin(event.value)
          .subscribe(() => {
              // const pk = this.auth.getUser().pk;
              // go to user page
              // this.router.navigate(['user', '${pk}']);
              this.location.back();
            });
        },
        ( {error} ) => {
          console.log('sign up error', error);
          this.error = true;
        }
      );
  }
}
