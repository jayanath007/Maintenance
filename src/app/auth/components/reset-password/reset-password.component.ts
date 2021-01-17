import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { PasswordValidator } from '../../models/password.validators';

@Component({
  selector: 'dps-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  errorText = '';
  hidePassword = true;
  hideNewPassword = true;
  sendSuccess = false;

  get passwordData() {
    return this.resetPasswordForm.controls;
  }

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8), PasswordValidator.passwordStrength]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: PasswordValidator.mustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  onResetPasswordBtnClick(param: Params) {
    this.submitted = true;
    if (!this.resetPasswordForm.invalid) {
      this.loading = true;
      if (param && param.token) {
        this.authenticationService
          .resetPassword(this.passwordData.confirmPassword.value, param.token)
          .pipe(first())
          .subscribe(
            data => {
              this.loading = false;
              this.authenticationService.logout();
              this.router.navigate(['/login']);
            },
            error => {
              this.loading = false;
              this.errorText = error;
            }
          );
      }

    }
  }
  onResiveNewLinkClick(param: Params) {
    this.submitted = true;
    if (param && param.email) {
      this.loading = true;
      this.authenticationService
        .sendPasswordResetEmailToUser(param.email)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.sendSuccess = true;
          },
          error => {
            this.loading = false;
            this.errorText = error;
            this.onResend();
          }
        );
    } else {
      this.onResend();
    }
  }
  onResend() {
    this.router.navigate(['/forgot_password']);
  }
}
