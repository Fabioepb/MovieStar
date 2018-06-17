import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  username: string;
  password: string;
  successAlert: any;
  failAlert: any;

  constructor(public navCtrl: NavController, public Storage: NativeStorage, public alertCtrl: AlertController) {
    this.username = null;
    this.password = null;

    this.successAlert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: "You have logged in to the World's worst app!",
      buttons: ["Ok"]
    });

    this.failAlert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: "You have failed logged in to the World's worst app!",
      buttons: ["Thank u jesus"]
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
        } else {
          this.failAlert.present();
        }
      })
  }
}
