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

	matches: Array<Match> | null;

    teams_following: Array<any>;

	constructor(public store: StoreService, public toastCtrl: ToastController) { }

	ngOnInit() {
        this.matches = this.store.getStorageMatches().data;

        this.store.user$.subscribe( user => {
            this.teams_following = user.teams;
        });
	}

    async displayToast(message) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: 1500
		  });
		  toast.present();
	}

	async fetchNextMatches() {
	    const response = await this.store.getNextMatches();
        if(response.success) {
            this.matches = response.data;~
            console.log(this.matches)
        } else {
            console.log("Error retrieving matches data");
        }
	}
}
