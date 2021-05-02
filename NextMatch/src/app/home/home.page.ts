import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from '../store/local-storage.service';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
 
})
export class HomePage implements OnInit {

	show_login_form: Boolean = true;

	local_storage_data: Object = null;

  	constructor(
		  public toastController: ToastController,
		  public store: StoreService,
		  public local_storage: LocalStorageService
	) {

		new Promise( (resolve, reject) => {
			const response = this.store.getAllTeams();
			console.log(response);
			resolve(response)
		}).then(data => {
			console.log(data);
		})

	}

	ngOnInit() {
		this.local_storage_data = this.local_storage.getData();
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
