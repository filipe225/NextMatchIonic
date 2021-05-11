import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../helpers/User';
import { FirebaseService } from './firebase.service';
import { FootballDataService } from './football-api.service';
import { LocalStorageService } from './local-storage.service';
import Competition from '../helpers/Competition';
import Team from '../helpers/Team';
import { R3ResolvedDependencyType } from '@angular/compiler';

@Injectable({
  	providedIn: 'root'
})
export class StoreService {

    private last_football_data_request: Date;

	readonly user$: Observable<User>;
	private _user$: BehaviorSubject<User>;

	readonly competition_teams$: Observable<any>;
	private _competition_teams$: BehaviorSubject<any>;

  	constructor(
		  public football_service: FootballDataService,
		  public firebase_service: FirebaseService,
		  public local_storage_service: LocalStorageService

	  ) {
		this._user$ = new BehaviorSubject<User>(null);
		this.user$ = this._user$.asObservable();

		this._competition_teams$ = new BehaviorSubject<any>(null);
		this.competition_teams$ = this._competition_teams$.asObservable();
	}

	protected getUser() {
		return this._user$.getValue();
	}

	protected setUser(nextValue: any) : void {
		console.log('Previous state', this.user$);
		this._user$.next({
            ...this.getUser(),
            ...nextValue
        });
		console.log('Current state', this.user$);
	}

	protected getCompetitionTeams() {
		return this._competition_teams$.getValue();
	}

	protected setCompetitionTeams(next_value: any) {
		this._competition_teams$.next(next_value);
	}

	async registerUser(user_obj) {
		console.log("Store Service -> Function registerUser");
		const { email, password, repeat_password, display_name, timezone } = user_obj;

		if( password.length < 6 && repeat_password.length < 6) {
			return new Error('Password length is too small');
		}

		if( password !== repeat_password) {
			return new Error('Passwords do not match')
		}

		if(  display_name.length < 3 || display_name.length > 20 ) {
			return new Error('Display name length is invalid');
		}

		try {
			const data = await this.firebase_service.registerUser(email, password, display_name, timezone)
			return data;		
		} catch (error) {
			return error;
		}
		
	}

	async loginUser(user_obj) {
		console.log('Store Service -> Function loginUser');
		const { email, password } = user_obj;

		const response = await this.firebase_service.loginUser(email, password);
        console.log(response);
        if(response.success) {
            this.setUser(response.data);
        }

        return response;
	}

	async getAllTeams() {
		const response = await this.firebase_service.getAllCompetitionsTeams();

		const competitions: Array<Competition> = [];

		if ( response.success ) {
			response.data.forEach( comp_obj => {
				const teams: Array<Team> = [];

				comp_obj.teams.forEach( team_obj => {
					const team: Team = {
						id: team_obj.id,
						founded: team_obj.founded,
						last_updated: team_obj.lastUpdated,
						name: team_obj.name,
						short_name: team_obj.shortName,
						tla: team_obj.tla,
						venue: team_obj.venue,
						website: team_obj.website
					}
					teams.push(team);
				})

				const comp: Competition = {
					id: parseInt(comp_obj.competition_id),
					country: comp_obj.country,
					league_name: comp_obj.league_name,
					teams: teams
				};

				competitions.push(comp)
			});

		} else {
			return {
				success: false,
				message: 'Failed to retrive competitions'
			}
		}

		this.setCompetitionTeams(competitions);

		console.log("Competitions", this.getCompetitionTeams());

		return {
			success: true,
			message: 'Successfully retrieved competitions'
		}
	}

    async followTeam(team_id: number, team_name: string) {
        const user = this.getUser();
        const max_teams = user.type === 'admin' ? 10 : 5;
        
        if (user.teams.length < max_teams) {
            const teams = user.teams;
            teams.push(team_id);
            const response = await this.firebase_service.updateUserDocWithMerge(user.uid, {teams: teams});

            if (response.success) {
                this.setUser({
                    teams: teams
                });
                return {
                    success: true,
                    message: `Following team ${team_name}`
                }
            } else {
                return {
                    success: false,
                    message: 'Error following team. Try again later.'
                }
            }
        } else {
            return {
                success: false,
                message: 'Not possible to follow more teams. Unfollow one first.'
            }
        }
    }

    async unfollowTeam(team_id: number) {
        const user = this.getUser();

        const teams = user.teams;

        teams.forEach( (id, i) => {
            if (id=== team_id) {
                teams.splice(i, 1);
            }
        });

        const response = await this.firebase_service.updateUserDocWithMerge(user.uid, {teams: teams});
        
    }


    getNextMatches(teams) {
        // if (this.user$.type === 'normal') {}

        if(teams.length === 0) {
            return {
                success: false,
                message: 'Start following some teams',
                data: null
            }
        }

        const response:any = this.football_service.getNextMatches(teams);
        if( response.success ) {
            this.local_storage_service.setData({
                last_request: new Date().toISOString(),
                data: response.data
            })
        } else {
            console.log("Successo falso");
        }

    }

}
