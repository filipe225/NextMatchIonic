import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Match } from '../helpers/Match';
import { ToastService } from '../helpers/Toast';
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

	muck_data = {
		last_request: new Date().toISOString(),
		matches: [
			{
				home_team: 'fc Porto',
				away_team: 'SL Benfica',
				competition: 'Liga NOS',
				date: new Date(),
				venue: 'Estadio do Dragao'
			},
			{
				home_team: 'fc Porto',
				away_team: 'SL Benfica',
				competition: 'Liga NOS',
				date: new Date(),
				venue: 'Estadio do Dragao'
			},
			{
				home_team: 'fc Porto',
				away_team: 'SL Benfica',
				competition: 'Liga NOS',
				date: new Date(),
				venue: 'Estadio do Dragao'
			},
			{
				home_team: 'fc Porto',
				away_team: 'SL Benfica',
				competition: 'Liga NOS',
				date: new Date(),
				venue: 'Estadio do Dragao'
			}
		] as Match[]
	}

  	constructor(
		  public toastController: ToastController,
		  public store: StoreService,
		  public local_storage: LocalStorageService,
          public toast_service: ToastService,
          public router: Router
	) {	}

	ngOnInit() {
		this.local_storage_data = this.local_storage.getData();
	}

	showRegisterForm() {
		this.show_login_form = false;
	}

	showLoginForm() {
		this.show_login_form = true;
	}

	async loginUser(user_obj) {
		console.log("Home component -> function loginUser")
		console.log(user_obj);
		const response: any = await this.store.loginUser(user_obj);
        if(response.success) {
            this.toast_service.showToast(response.message, 'success', 1500);
            this.router.navigateByUrl('/matches');
        } else {
            this.toast_service.showToast(response.message, 'danger', 1500);
        }
	}

	async registerUser(user_obj) {
		console.log("Home component -> function registerUser");
		console.log(user_obj);

		try {
			const response: any = await this.store.registerUser(user_obj);
			console.log("Inside promise response", response);
            const color = response.success ? 'success' : 'danger';
            this.toast_service.showToast(response.message, color, 2000);
            this.showLoginForm();

		} catch (error) {
			this.toast_service.showToast('Error registering. Try again later.', 'danger', 2000);
		}
	}

}
