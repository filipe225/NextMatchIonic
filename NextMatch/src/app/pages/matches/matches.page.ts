import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from 'src/app/store/store';

interface Match {
	home_team: string,
	away_team: string,
	competition: string
	date?: Date
}

@Component({
	selector: 'app-matches',
	templateUrl: './matches.page.html',
	styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

	loading: boolean = true;

	matches: Array<Match> = [
		{
			home_team: 'Porto',
			away_team: 'Benfica',
			competition: 'Liga NOS'
		},
		{
			home_team: 'Porto',
			away_team: 'Benfica',
			competition: 'Liga NOS'
		},
		{
			home_team: 'Porto',
			away_team: 'Benfica',
			competition: 'Liga NOS'
		}
	]

	constructor(public store: Store, public toastCtrl: ToastController) { }

	ngOnInit() {
	}

	async displayToast(message) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: 1500
		  });
		  toast.present();
	}

	fetchNextMatches() {
		//this.store.fetchNewData();
	}
}
