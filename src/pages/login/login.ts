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

	username: string;
	password: string;

	constructor(public navCtrl: NavController, public storage: NativeStorage, public toastCtrl: ToastController) {
		this.username = null;
		this.password = null;
	}

	toRegister() {
		this.navCtrl.push(RegisterPage);
	}

	logIn() {
		this.storage.getItem("users").then(users => {
			const bool = users.some((user) => {
				return this.username === user.username && this.password === user.password;
			});
			if(bool) {
				this.logResult({
					message: 'You have Logged in!',
					status: 200,
					duration: 1800,
					position: "top",
				});
			} else {
				this.logResult({
					message: 'Invalid username/password',
					status: 400,
					duration: 2200
				});
			}
		}).catch(err =>{
			this.logResult({
				message: 'Try again later',
				status: 400,
				duration: 2000,
			});
		});
	}

	outPut() {
		this.storage.getItem('users').then((users) => {
			console.log(JSON.stringify(users))
		}).catch((err) => {
			console.log(JSON.stringify(err))
		})
	}
	
	logResult({ message, status, ...rest }) {
		this.toastCtrl.create({ 
			message: message,
			...rest 
		}).present();
		if (status === 200) {
			this.navCtrl.setRoot(TabsPage);
		}
	}

}
