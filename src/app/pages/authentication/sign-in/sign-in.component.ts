import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signInRequest } from 'src/app/core/store/actions/auth.actions';
import { State } from 'src/app/core/store/reducers';
import { getSignInStatus } from 'src/app/core/store/reducers/app-status.reducer';
import { RequestActionState } from 'src/app/shared/enums/RequestActionState';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  passwordHidden = true;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.store.select(getSignInStatus).subscribe((status) => {
      if (status && status.state === RequestActionState.FAILURE) {
        this.signInForm.setErrors({ invalidCredentials: true });
      }
    });
  }

  signIn() {
    const { userName, password } = this.signInForm.controls;
    this.store.dispatch(signInRequest({ payload: { identifier: userName.value, password: password.value } }));
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
}
