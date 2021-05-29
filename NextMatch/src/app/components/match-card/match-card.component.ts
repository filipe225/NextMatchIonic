import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/helpers/Match';

@Component({
	selector: 'app-match-card',
	templateUrl: './match-card.component.html',
	styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

	@Input() match: Match
    @Input() teams_following: Array<any>

	constructor() { }

	ngOnInit() {
        console.log(this.teams_following);
    }

    isFollowing(team_name) {
        return this.teams_following.some( (obj: any) =>  obj.name === team_name); 
    }
}
