import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    templateUrl: "popover.html"
})
export class PopoverPage{
    constructor(public navCtlr: NavController){}
    
    toLogin(){
        this.navCtlr.push(LoginPage);
        this.navCtlr.setRoot(LoginPage);
    }
}