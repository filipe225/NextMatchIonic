import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  	providedIn: 'root'
})
export class FootballDataService {

	private readonly header_options: HttpHeaders = {
        'X-Auth-Token': 'YOUR_API_TOKEN'
    };

    private readonly base_url: string = 'http://api.football-data.org/v2/';

	
  	constructor(public http: HttpClient) {
	}

}
