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
	username: string = '';
	password: string='';
	email: string='';
	date: any;
	//loginCheck = /[a-zA-Z]+/;
	//emailCheck = /[a-zA-Z]+\@[A-Za-z]+.com/;

	signUp() {
		if(this.checkInputs()){
			let newUser = {
				username: this.username,
				password: this.password,
				email: this.email,
				date: this.date,
				latestMovies: [],
				favorites: [],
				saved: [],
			}
			this.storage.getItem(newUser.username).then((user) => {
				this.toastAlert({
					message: 'Username already in used',
					duration: 2000,
					position: "top",
				});
			}).catch((error) => {
				this.storage.setItem(newUser.username, newUser).then(() => {
					this.toastAlert({
						message: 'Account created succesfully!',
						duration: 2000,
						position: "top",
					});
					this.navCtrl.pop();
				});
			});
		} else {
			this.toastAlert({
				message: 'Empty fields',
				duration:2000,
			});
		}
	}

	toastAlert({ message, ...rest }) {
		this.toastCtrl.create({ 
			message: message, 
			...rest
		}).present();
	}
	checkInputs(){
		if(this.username == '' || this.password == '' || this.email == '' || this.date == null) {
			return false
		} else {
			return true
		}
	}

}