import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../helpers/User';
import { FirebaseService } from './firebase.service';
import { FootballDataService } from './football-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  	providedIn: 'root'
})
export class StoreService {

	readonly user$: Observable<User>;
	private _user$: BehaviorSubject<User>;

  	constructor(
		  public football_service: FootballDataService,
		  public firebase_service: FirebaseService,
		  public local_storage_service: LocalStorageService

	  ) {
		this._user$ = new BehaviorSubject<User>(null);
		this.user$ = this._user$.asObservable();
	}

	protected getUser() {
		return this._user$.getValue();
	}

	protected setUser(nextValue: User) : void {
		console.log('Previous state', this.user$);
		this._user$.next(nextValue);
		console.log('Current state', this.user$);
	}

	registerUser(user_obj): Promise<any> | Error {
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

		return new Promise( async (resolve, reject) => {
			 const result = await this.firebase_service.registerUser(email, password, display_name, timezone);
			 console.log(result);

		})
	}

	loginUser(user_obj) {
		console.log('Store Service -> Function loginUser');
		const { email, password } = user_obj;
		console.log(email, password);

		this.firebase_service.loginUser(email, password);
	}
}
