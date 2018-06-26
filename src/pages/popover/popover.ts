import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    template: "popover.html"
})
export class PopoverPage{
    constructor(public navCtlr: NavController){}
    
    toLogin(){
        this.navCtlr.setRoot(LoginPage);
    }
}