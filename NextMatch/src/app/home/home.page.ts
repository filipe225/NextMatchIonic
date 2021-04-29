import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
 
})
export class HomePage {

	show_login_form: Boolean = true;

  	constructor(
		  public toastController: ToastController,
		  public store: StoreService
	) {}

	showRegisterForm() {
		this.show_login_form = false;
	}

	showLoginForm() {
		this.show_login_form = true;
	}

	loginUser(user_obj) {
		console.log("Home component -> function loginUser")
		console.log(user_obj);
		this.store.loginUser(user_obj);
	}

	registerUser(user_obj) {
		console.log("Home component -> function registerUser");
		console.log(user_obj);

		const response = this.store.registerUser(user_obj)
		console.log("Home page response ->>" , response);

	}

}
