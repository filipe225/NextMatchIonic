import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  	providedIn: 'root'
})
export class FootballDataService {

	private readonly header_options: HttpHeaders;

	
  	constructor(public http: HttpClient) {
	}

}
