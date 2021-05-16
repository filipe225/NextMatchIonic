import { Component, OnInit } from '@angular/core';
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

    user_teams: Array<Number>;

	constructor(public store: StoreService) { }

	ngOnInit() {
		this.getTeamsCompetitions();

		this.store.competition_teams$.subscribe( comps => {
			this.competitions = comps;
		});

        this.store.user$.subscribe( user_data => {
            this.user_teams = user_data.teams;
        })
	}

    async addNewTeam(team_id, team_name) {
        console.log("Team Id: ", team_id);

        const response = await this.store.followTeam(team_id, team_name)
        console.log(response);
    }

    async removeTeam(team_id, team_name) {
        console.log("Team Id: ", team_id)

        const response = await this.store.unfollowTeam(team_id, team_name);
        console.log(response);
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
