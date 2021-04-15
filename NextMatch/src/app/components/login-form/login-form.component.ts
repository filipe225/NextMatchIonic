import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

	user: Object = {
		email: null,
		password: null
	};

	show_login_form: Boolean = true;

	constructor() { }

	ngOnInit() {}

}
