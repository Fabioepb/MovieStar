import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username:string;
  password:string;
  email:string;
  date:any;
  constructor(public navCtrl: NavController, public Storage: NativeStorage, public toastCtrl: ToastController) {
  }

  registrarUser(){
    this.Storage.setItem("user",{
      user_username: this.username,
      user_password: this.password,
      user_email: this.email,
      user_date: this.date
    }).then(()=>{
      const toast = this.toastCtrl.create({
        message: "Account created succesfully!",
        duration: 2000
      });
      toast.present();
      this.navCtrl.pop();
    })
  }
}
