import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { OmdbApi } from '../../api/omdb';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	constructor(
		public navCtrl: NavController, 
		public storage: NativeStorage, 
		public toastCtrl: ToastController,
		private api: OmdbApi
	) {}
	username: string = 'Jnlbr';
	password: string = '1234';
	
	logIn() {
		this.navCtrl.setRoot(TabsPage,{
			username: this.username,
			password: this.password,
		})
		.then((exist) => {
			if(exist) {
				this.toastAlert({
					message: 'You have Logged in!',
					duration: 1800,
					position: "top",
				});
			} else {
				this.toastAlert({
					message: 'Invalid username/password',
					duration: 2200
				});
			}
		});
	}

	toastAlert({ message, ...rest }) {
		this.toastCtrl.create({ 
			message: message,
			...rest 
		}).present();
	}

	toRegister() {
		this.navCtrl.push(RegisterPage);
	}

	// Test functions... 
	outPut() {
		// this.storage.getItem('users').then((users) => {
		// 	console.log(JSON.stringify(users))
		// }).catch((err) => {
		// 	console.log(JSON.stringify(err))
		// });
		this.storage.clear();
	}
}
