import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	user: Object = {
		email: null,
		password: null,
		repeat_password: null
	}

	constructor() { }

	ngOnInit() {}

}
