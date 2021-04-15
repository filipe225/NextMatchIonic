import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
 
})
export class HomePage {

	show_login_form: Boolean = true;

  	constructor() {}

	showRegisterForm() {
		this.show_login_form = false;
	}

	showLoginForm() {
		this.show_login_form = true;
	}

}
