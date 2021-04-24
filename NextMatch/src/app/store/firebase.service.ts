import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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

	registerUser(email, password) {
		return new Promise( (resolve, reject) => {
			const response = this.auth.createUserWithEmailAndPassword(email, password);
			console.log(response);
			resolve(response);
		});
	}
}
