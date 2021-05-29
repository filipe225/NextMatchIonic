import { Component, OnInit, Output, EventEmitter, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	@Output() registerEvent = new EventEmitter<Object>()

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
		],
		'repeat_password': [
			{ type: 'required', message: 'Confirm Password can not be empty' },
			{ type: 'minlength', message: '' }
		],
		'display_name': [
			{ type: 'required', message: 'Display name can not be empty' },
			{ type: 'minlength', message: 'Display name must be at least 3 characters long' },
			{ type: 'maxlength', message: 'Display name can not have more than 20 characters' }
		],
		'timezone': [
			{ type: 'required', message: 'Timezone can not be empty' },
		],
	}

	RegisterForm: FormGroup;

	timezones: Array<string> = ['GMT','GMT+1', 'GMT+2', 'GMT+3', 'GMT+4','GMT+5', 
        'GMT+6', 'GMT+7', 'GMT+8', 'GMT+9', 'GMT+10', 'GMT+11', 'GMT+12',
		'GMT-1', 'GMT-2', 'GMT-3', 'GMT-4', 'GMT-5', 'GMT-6', 'GMT-7',
		'GMT-8', 'GMT-9', 'GMT-10', 'GMT-11', 'GMT-12', 'GMT-13', 'GMT-14'];

	constructor() { }

	ngOnInit() {
		this.RegisterForm = new FormGroup(
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
				]),
				repeat_password: new FormControl('', [
					Validators.required
				]),
				display_name: new FormControl('', [
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20)
				]),
				timezone: new FormControl(0, [Validators.required])
			},

			{
				updateOn: 'change'
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

	getDisplayName() {
		return this.RegisterForm.get('display_name').value;
	}

	getTimezone() {
		return 'Etc/' + this.RegisterForm.get('timezone').value;
	}

	registerUser() {
		console.log(this.getEmail(), this.getPassword(), this.getRepeatPassword());
		this.registerEvent.emit( {
			email: this.getEmail(),
			password: this.getPassword(),
			repeat_password: this.getRepeatPassword(),
			display_name: this.getDisplayName(),
			timezone: this.getTimezone()
		})
	}
}
