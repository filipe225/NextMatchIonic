import { Component, OnInit } from '@angular/core';
import Team from 'src/app/helpers/Team';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

    teams: Array<Team>;

    constructor(public store: StoreService) { }

    ngOnInit() {
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

    async unfollowTeam(team_id) {
        console.log(team_id);
    }


}
