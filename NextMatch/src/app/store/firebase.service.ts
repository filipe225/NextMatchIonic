import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import ReturnData from '../helpers/ReturnData';
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

	async registerUser(email: string, password: string, timezone: string, display_name: string): Promise<ReturnData> {
		console.log("Firebase Service --> Function registerUser()")

		try {

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

			const result_query = await this.firestore.collection('users').doc(result.uid).set(user)

			return {
				success: true,
				message: 'Successful registration! You can login now.'
			}

		} catch(error) {
			console.error(error);
			return {
				success: false,
				message: ""
			}
		}

	}

	getAllCompetitionsTeams() {
		console.log('Function getAllCompetitionsTeams()')
		return this.firestore.collection('teams').get().toPromise()
			.then( (query_snapshot) => {
				const data = [];
				query_snapshot.forEach( doc => {
					data.push(doc.data());
				});
				console.log("snapshot data", data);
				return data;
			})
			.catch( error => {
				console.error(error);
			});
	}
}
