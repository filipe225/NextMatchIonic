import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import Team from 'src/app/helpers/Team';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

	competitions: any;

	teams: Array<Team>;

	constructor(public store: StoreService) { }

	ngOnInit() {
		this.getTeamsCompetitions();

		this.store.competition_teams$.subscribe( comps => {
			this.competitions = comps;
		});
	}

	getTeamsForCompetition(competition) {
		this.competitions.forEach( obj => {
			if(obj.league_name === competition) {
				this.teams = obj.teams;
			}
		});
	}

	async getTeamsCompetitions() {
		const response = await this.store.getAllTeams();

		if( !response.success) {
			// create toast and go back
			console.log("Erro");
		}
	}

}
