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

  constructor(public navCtrl: NavController, public Storage: NativeStorage, public toastCtrl: ToastController) {
    this.username = null;
    this.password = null;
  }

  toRegister() {
    this.navCtrl.push(RegisterPage);
  }

  showSuccessToast(){
    let successAlert = this.toastCtrl.create({
      message: 'You have Logged in!',
      duration: 1800,
      position: "top",
    });
    successAlert.present();
  }
  showFailToast(){
    let failToast = this.toastCtrl.create({
      message: 'Invalid username/password',
      duration: 2200
    });
    
    failToast.present();
  }

  onLogin() {
    this.Storage.getItem("user")
      .then(data => {
        if (this.username == data.user_username && this.password == data.user_password) {
          this.showSuccessToast();
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.showFailToast();
        }
      })
      .catch(err =>{
        this.showFailToast();
      });
  }

}
