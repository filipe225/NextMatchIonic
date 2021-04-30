import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

	competitions: Array<string>

	teams: Object
	
	placeholder_data: any;

	constructor(public store: StoreService) { }

	ngOnInit() {
		this.getTeamsCompetitions();
	}

	getTeamsForCompetition(competition) {
		console.log(competition);
		this.placeholder_data.forEach( obj => {
			if(obj.league_name === competition) {
				this.teams = obj.teams;
			}
		});
		console.log("teams", this.teams);
	}

	async getTeamsCompetitions() {
		const data: any = await this.store.getAllTeams();

		console.log("GET TEAMS COMPETITIONS", data);

		this.placeholder_data = data;
		this.competitions = data.map( obj => obj.league_name)
	}

}
