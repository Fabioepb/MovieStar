import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  username: string;
  password: string;
  successAlert: any;
  failAlert: any;

  constructor(public navCtrl: NavController, public Storage: NativeStorage, public toastCtrl: ToastController) {
    this.username = null;
    this.password = null;

    this.successAlert = this.toastCtrl.create({
      message: 'You have Logged in!',
      duration: 1800,
      position: "top",
    });

    this.failAlert = this.toastCtrl.create({
      message: 'Invalid username/password',
      duration: 2200
    });
  }

  toRegister() {
    this.navCtrl.push(RegisterPage);
  }

  onLogin() {
    this.Storage.getItem("user")
      .then(data => {
        if (this.username == data.user_username && this.password == data.user_password) {
          this.successAlert.present();
          this.navCtrl.setRoot(HomePage);
        } else {
          this.failAlert.present();
        }
      })
  }
}
