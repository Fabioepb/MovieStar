import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	constructor (
		public navCtrl: NavController, 
		public storage: NativeStorage, 
		public toastCtrl: ToastController
	) {}
	username: string;
	password: string;
	email: string;
	date: any;

	signUp() {
		let newUser = {
			username: this.username,
			password: this.password,
			email: this.email,
			date: this.date,
			latestMovies: [],
		}
		this.storage.getItem(newUser.username).then((user) => {
			this.toastAlert({
				message: 'Username already in used',
				duration: 2000,
				status: 200,
			});
		}).catch((error) => {
			this.storage.setItem(newUser.username, newUser).then(() => {
				this.toastAlert({
					message: 'Account created succesfully!',
					duration: 2000,
					status: 200,
				});
				this.navCtrl.pop();
			});
		});
	}

	// signUp() {
	// 	let newUser = {
	// 		username: this.username,
	// 		password: this.password,
	// 		email: this.email,
	// 		date: this.date,
	// 	}
	// 	try {
	// 		this.storage.getItem('users').then((users) => {
	// 			// Verificar datos repetidos
	// 			this.storage.setItem('users', [newUser, ...users]);
	// 		}).catch((error) => {
	// 			this.storage.setItem('users', [newUser]);
	// 		});
	// 		this.toastAlert({
	// 			message: 'Account created succesfully!',
	// 			duration: 2000,
	// 			status: 200,
	// 		});
	// 	} catch(error) {
	// 		console.log(JSON.stringify(error));
	// 		this.toastAlert({
	// 			message: 'Problem with my amazing api, try again later',
	// 			duration: 2000,
	// 			status: 400,
	// 		});
	// 	}
	// }

	toastAlert({ message, status, ...rest }) {
		this.toastCtrl.create({ 
			message: message, 
			...rest
		}).present();
	}

}
