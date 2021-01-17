import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'dps-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  errorText = '';
  sendSuccess = false;

  get forgotPasswordData() {
    return this.forgotPasswordForm.controls;
  }

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onBeginResetBtnClick() {
    this.submitted = true;
    if (!this.forgotPasswordForm.invalid) {
      this.loading = true;
      this.authenticationService
        .sendPasswordResetEmailToUser(this.forgotPasswordData.email.value)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.sendSuccess = true;
          },
          error => {
            this.loading = false;
            this.errorText = error;
          }
        );
    }
  }
}
