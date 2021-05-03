import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/helpers/Match';
import { LocalStorageService } from 'src/app/store/local-storage.service';

@Component({
  selector: 'app-matches-offline',
  templateUrl: './matches-offline.page.html',
  styleUrls: ['./matches-offline.page.scss'],
})
export class MatchesOfflinePage implements OnInit {

	matches: Match[] = null;

  	constructor(public local_storage: LocalStorageService) { }

  	ngOnInit() {
		this.matches = this.local_storage.getData();

		if( !this.matches ) {
			console.log('Erro');
		}
  	}

}
