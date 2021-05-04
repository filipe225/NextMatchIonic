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

	async loginUser(email, password) {

        const user_credential = await this.auth.signInWithEmailAndPassword(email, password);

        console.log("User credentials", user_credential);
    
        // const user_document = global.users_ref.doc(user_uid);
        // const document_data = await user_document.get();
    
        // if (doc.exists) {
        //     console.log('Document data:', document_data.data());
        // } else {
        //     console.log('No such document!');
        // }

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
					data.push(	
						{ 
							competition_id: doc.id, 
							...doc.data() as Object 
						}
					);
				});
				console.log("snapshot data", data);
				return {
					success: true,
					data: data
				}
			})
			.catch( error => {
				console.error(error);
				return {
					success: false,
					message: '',
					data: error.message
				}
			});
	}
}
