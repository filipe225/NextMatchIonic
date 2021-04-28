import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

	@Output() loginEvent = new EventEmitter<Object>();

	LoginForm: FormGroup;

	show_login_form: Boolean = true;

	validation_messages: Object = {
		'email': [
			{ type: 'required', message: 'Email can not be empty' },
			{ type: 'email', message: 'Email does not match the pattern'},
			{ type: 'maxlength', message: 'Email can not have more than 60 characters' }
		],
		'password': [
			{ type: 'required', message: 'Password can not be empty' },
			{ type: 'minlength', message: 'Password must be at least 6 characters long' },
			{ type: 'maxlength', message: 'Password can not have more than 20 characters' }
		]
	}

	constructor() { }

	ngOnInit() {

		this.LoginForm = new FormGroup(
			{
				email: new FormControl('', [
					Validators.required,
					Validators.email,
					Validators.maxLength(60)
				]),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(20)
				])
			}
		), 
		{
			updateOn: 'blur'
		}

		console.log(this.LoginForm);
	}

	getEmail() {
		return this.LoginForm.get('email').value;
	}

	getPassword() {
		console.log(this.LoginForm.get('password'))
		return this.LoginForm.get('password').value;
	}

	loginUser() {
		console.log('Login User');
		console.log(this.getEmail(), this.getPassword());

		this.loginEvent.emit( {
			email: this.getEmail(),
			password: this.getPassword()
		})

	}
}
