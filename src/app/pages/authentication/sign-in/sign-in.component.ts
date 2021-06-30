import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signInRequest } from 'src/app/core/store/actions/auth.actions';
import { State } from 'src/app/core/store/reducers';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [fadeInAnimation],
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
  }

  signIn() {
    const { userName, password } = this.signInForm.controls;
    this.store.dispatch(signInRequest({ payload: { identifier: userName.value, password: password.value } }));
  }

  showPassword() {
    this.passwordHidden = !this.passwordHidden;
  }
}
