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

		return this.auth.signInWithEmailAndPassword(email, password)
			.then(user => {
				console.log(user);
				return user;
			});

	}

	async registerUser(email: string, password: string, timezone: string, display_name: string) {

		const result: any = await this.auth.createUserWithEmailAndPassword(email, password);
		const user: User = {
			type: 'normal',
			email: email,
			timezone: timezone,
			display_name: display_name,
			teams: [],
			last_request: new Date().toISOString(),
			creation_timestamp: new Date().toISOString()
		}

		const response = await this.firestore.collection('users').doc(result.uid).set(user);
		return response

		// return this.auth.createUserWithEmailAndPassword(email, password)
		// 	.then( (result: any) => {
		// 		const user: User = {
		// 			type: 'normal',
		// 			email: email,
		// 			timezone: timezone,
		// 			display_name: display_name,
		// 			teams: [],
		// 			last_request: new Date().toISOString(),
		// 			creation_timestamp: new Date().toISOString()
		// 		}

		// 		return this.firestore.collection('users').doc(result.uid).set(user);
		// 	});
	}

	getAllCompetitionsTeams() {
		console.log('Function getAllCompetitionsTeams()')
		return this.firestore.collectionGroup('teams').get();
	}
}
