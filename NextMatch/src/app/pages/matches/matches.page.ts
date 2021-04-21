import { Component, OnInit } from '@angular/core';

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

	constructor() { }

	ngOnInit() {
	}

}
