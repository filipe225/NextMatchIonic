import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class LocalStorageService {

	private readonly local_key: string = 'previous_data';

	private _state$: BehaviorSubject<any>;
	readonly state$: Observable<any>;

  	constructor() { 
		
		const previous_data = JSON.parse(localStorage.getItem(this.local_key));

		if(previous_data != null) {
			this._state$ = new BehaviorSubject<any>(previous_data);
		} else {
			this._state$ = new BehaviorSubject<any>(null);
		}

		this.state$ = this._state$.asObservable();

	}

	getData() {
		return JSON.parse(localStorage.getItem(this.local_key));
	}

	setData(data) {
		return localStorage.setItem(this.local_key, JSON.stringify(data));
	}
}