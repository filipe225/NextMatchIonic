
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../helpers/User";


export class Store {

	readonly user$: Observable<User>;
	private _user$: BehaviorSubject<User>;

	constructor() {
		this._user$ = new BehaviorSubject<User>(null);
		this.user$ = this._user$.asObservable();
	}

	getUser() {
		return this._user$.getValue();
	}

	protected setUser(nextValue: User) : void {
		console.log('Previous state', this.user$);
		this._user$.next(nextValue);
		console.log('Current state', this.user$);
	}

	registerUser(email, password, repeat_password) {

	}

	loginUser(email: string, password: string) {
		
	}
}