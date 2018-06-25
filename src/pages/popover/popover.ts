import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    template: `
        <ion-list>
            <ion-item>
                <div (click)="toLogin()">Logout</div>
            </ion-item>
            <ion-item>
                <div>Quit</div>
            </ion-item>
        </ion-list>
        `
})
export class PopoverPage{
    constructor(public navCtlr: NavController){}
    
    toLogin(){
        this.navCtlr.setRoot(LoginPage);
    }
}