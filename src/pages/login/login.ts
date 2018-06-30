import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	constructor(
		public navCtrl: NavController, 
		public storage: NativeStorage, 
		public toastCtrl: ToastController,
	) {}
	username: string = '';
	password: string = '';
	
	logIn() {
		if(this.checkInputs()) {
			this.navCtrl.setRoot(TabsPage, {
				username: this.username,
				password: this.password,
			})
				.then((exist) => {
					if (exist) {
						this.toastAlert({
							message: 'You have Logged in!',
							duration: 1800,
							position: "top",
						});
					} else {
						this.toastAlert({
							message: 'Invalid username/password',
							duration: 2200,
							position: "top",
						});
					}
				});
		} else {
			this.toastAlert({
				message: 'Empty fields',
				duration: 2000,
				position: 'top',
			});
		}
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
	checkInputs() {
		if (this.username == '' || this.password == '') {
			return false
		} else {
			return true
		}
	}
}
