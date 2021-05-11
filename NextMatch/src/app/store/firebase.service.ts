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

        try {
            await this.auth.setPersistence('session');
            const user_credential: any = await this.auth.signInWithEmailAndPassword(email, password);

            console.log("User credentials", user_credential);

            const user_data: any = await this.firestore.collection('users')
                                        .doc(user_credential.user.uid).get().toPromise()
                                        .then( doc => {
                                            return doc.data();
                                        });

            console.log("User data", user_data)

            const logged_user: User = {
                uid: user_credential.user.uid,
                email: user_credential.user.email,
                display_name: user_credential.user.displayName,
                creation_timestamp: user_data.creation_timestamp,
                last_request: user_data.last_request,
                teams: user_data.teams,
                timezone: user_data.timezone,
                type: user_data.type
            }

            return {
                success: true,
                message: 'Login successful',
                data: logged_user
            }
        
        } catch( error) {
            console.error(error);
            return {
                success: false,
                message: 'Erro',
                data: null
            }
        };
	}

	async registerUser(email: string, password: string, display_name: string, timezone: string) {
		console.log("Firebase Service --> Function registerUser()")

		try {

			const result: any = await this.auth.createUserWithEmailAndPassword(email, password);
            console.log("registering User", result);
            const u = this.auth.currentUser;
            (await u).updateProfile({
                displayName: display_name
            });
			const user: User = {
				type: 'normal',
				email: email,
				timezone: timezone,
				display_name: display_name,
				teams: [],
				last_request: new Date().toISOString(),
				creation_timestamp: new Date().toISOString()
			}

			const result_query = await this.firestore.collection('users').doc(result.user.uid).set(user)

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

    async updateUserDocWithMerge(uid, obj) {
        try {
          const result = await this.firestore.collection('users').doc(uid).set(obj, { merge: true });
          console.log(result);
          return {
              success: true,
              message: 'Successfully updated database',
              data: result
          }  
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Error updating database'
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
