import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	RegisterForm: FormGroup;

	constructor() { }

	ngOnInit() {
		this.RegisterForm = new FormGroup(
			{
				email: new FormControl('', [ Validators.required ]),
				password: new FormControl('', [Validators.required, Validators.minLength(6)]),
				repeat_password: new FormControl('', [Validators.required])
			},

			{
				updateOn: 'blur'
			}
		)
	}

	getEmail() {
		return this.RegisterForm.get('email').value;
	}

	getPassword() {
		return this.RegisterForm.get('password').value;
	}

	getRepeatPassword() {
		return this.RegisterForm.get('repeat_password').value;
	}

	registerUser() {
		console.log(this.getEmail(), this.getPassword(), this.getRepeatPassword());
	}
}
