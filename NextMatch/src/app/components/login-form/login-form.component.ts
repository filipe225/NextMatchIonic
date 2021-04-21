import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

	LoginForm: FormGroup;

	show_login_form: Boolean = true;

	constructor() { }

	ngOnInit() {
		this.LoginForm = new FormGroup(
			{
				email: new FormControl('', [
					Validators.required,
					Validators.minLength(4)
				]),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(6)
				])
			}
		), 
		{
			updateOn: 'blur'
		}
	}

	getEmail() {
		return this.LoginForm.get('email').value;
	}

	getPassword() {
		return this.LoginForm.get('password').value;
	}

	loginUser() {
		console.log('Login User');
		console.log(this.getEmail(), this.getPassword());
	}
}
