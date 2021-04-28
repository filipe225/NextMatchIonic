import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../helpers/User';

@Injectable({
  	providedIn: 'root'
})
export class FirebaseService {

  	constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) {
	}

	loginUser(email, password) {

		return new Promise( (resolve, reject) => {
			const response = this.auth.signInWithEmailAndPassword(email, password);
			console.log(response);
			resolve(response);
		});
	}

	registerUser(email: string, password: string, timezone: string, display_name: string) {

		return new Promise( (resolve, reject) => {
			const response = this.auth.createUserWithEmailAndPassword(email, password);
			console.log(response);
			resolve(response);
		}).then( (user_data: any) => {

			console.log("function registerUser promise then")

			const user: User = {
				type: 'normal',
				email: email,
				timezone: timezone,
				display_name: display_name,
				teams: [],
				last_request: new Date().toISOString(),
				creation_timestamp: new Date().toISOString()
			}

			const resp = this.firestore.collection('users').doc(user_data.uid).set(user);
			return resp;
		}).then( data => {
			console.log(data);
			return data;
		});
	}
}
