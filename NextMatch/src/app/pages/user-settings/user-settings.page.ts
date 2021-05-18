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
    teams: Array<Team>;

    constructor(public store: StoreService) { }

    ngOnInit() {

        this.display_name = '';
        this.timezone = '';

        this.teams = [
            {
                id: 3,
                short_name: 'FCP',
                name: 'FCP'
            },
            {
                id: 3,
                short_name: 'FCP',                
                name: 'FCP'
            },
            {
                id: 3,
                short_name: 'FCP',                
                name: 'FCP'
            }
        ]
    }

    async unfollowTeam(team_id, team_name) {
        console.log(team_id);

        this.store.unfollowTeam(team_id, team_name)
    }

    saveUserSettings() {
        console.log(this.display_name, this.timezone);
    }

}
