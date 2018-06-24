import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStorage } from '../../helpers/userStorage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

    user: {
        username:string,
        password:string,
    }
    favorites = [];

    constructor( 
		public navCtrl: NavController,
		public stg: UserStorage,
		public params: NavParams
    ) {
    	this.user = params.data;
    }

    ionViewDidEnter() {
		this.stg.getField({
            username: this.user.username,
            key: 'favorites'
		}).then(favorites => {
            console.log(favorites)
		    this.favorites = favorites;
		}).catch(err => {
		    console.log(JSON.stringify(err));
		});
    }


}
