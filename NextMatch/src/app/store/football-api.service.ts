import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';


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
    
    getNextMatches(teams: Array<Number>) {

        try {
            const observables: Array<Observable<any>> = [];

            teams.forEach( team_id => {
                observables.push(
                    this.http.get(`${this.base_url}teams/${team_id}/matches?limit=2`, {
                        headers: {
                            "X-Auth-Token": "4882ca4f5e6f4b6286814e9878749aa0"
                        }
                    })               
                )
            });

            return forkJoin(observables).toPromise().then( data => {
                return {
                    success: true,
                    message: 'Successfully retrieved next matches',
                    data: data
                };
            });

        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Error retrieving next matches!!'
            }
        }
    }

}
