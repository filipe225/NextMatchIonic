import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Match } from 'src/app/helpers/Match';
import { StoreService } from 'src/app/store/store.service';

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

	constructor(public store: StoreService, public toastCtrl: ToastController) { }

	ngOnInit() {
        //this.displayToast('Hello world');
        this.matches = [...this.matches, ...this.matches, ...this.matches];

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
