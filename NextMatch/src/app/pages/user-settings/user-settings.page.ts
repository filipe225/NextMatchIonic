import { Component, OnInit } from '@angular/core';
import Team from 'src/app/helpers/Team';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

    display_name: string;
    timezone: string;
    teams: any;

    constructor(public store: StoreService) { }

    ngOnInit() {

        this.display_name = '';
        this.timezone = '';

        this.store.user$.subscribe( user => {
            this.teams = user.teams;
        });
    }

    async unfollowTeam(team_id, team_name) {
        console.log(team_id);

        this.store.unfollowTeam({
            id: team_id, 
            name: team_name
        })
    }

    saveUserSettings() {
        console.log(this.display_name, this.timezone);
    }

}
