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
	) {

		new Promise( (resolve, reject) => {
			const response = this.store.getAllTeams();
			console.log(response);
			resolve(response)
		}).then(data => {
			console.log(data);
		})

	}
	


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

	async registerUser(user_obj) {
		console.log("Home component -> function registerUser");
		console.log(user_obj);

		try {
			const response: any = await this.store.registerUser(user_obj);
			console.log("Inside promise response", response)
		} catch (error) {
			
		}
	}

}
