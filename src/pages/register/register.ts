import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username:string;
  password:string;
  email:string;
  date:any;
  constructor(public navCtrl: NavController, public Storage: NativeStorage, public alertCtrl: AlertController) {
  }

  registrarUser(){
    this.Storage.setItem("user",{
      user_username: this.username,
      user_password: this.password,
      user_email: this.email,
      user_date: this.date
    }).then(()=>{
      const alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: "You have created an account in the World's worst app!",
        buttons: [{
          text:"Ok?",
          handler: event =>{
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
    })
  }
}
