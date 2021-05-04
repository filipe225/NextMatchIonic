import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  	providedIn: 'root'
})
export class FootballDataService {

	private readonly header_options = {
        'X-Auth-Token': '4882ca4f5e6f4b6286814e9878749aa0'
    };

    private readonly base_url: string = 'http://api.football-data.org/v2/';

	
  	constructor(public http: HttpClient) {
	}
    
    getNextMatches(teams: Array<number>) {
        const promises: Array<Promise<any>> = [];

        teams.forEach( team_id => {
            promises.push(
                this.http.get('http://api.football-data.org/v2/teams/' + team_id + '/matches?limit=2', {
                    "headers": {
                        "x-rapidapi-host": "v3.football.api-sports.io",
                        "X-Auth-Token": "4882ca4f5e6f4b6286814e9878749aa0"
                    }
                }).toPromise()                
            )

        })
    }

}
