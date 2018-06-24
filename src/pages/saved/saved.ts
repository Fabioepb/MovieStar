import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStorage } from '../../helpers/userStorage';

@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html'
})
export class SavedPage {

    user: {
        username:string,
        password:string,
    }
    saved = [];
    favorites = [];
    option: string = "saved";

    constructor( 
		public navCtrl: NavController,
		public stg: UserStorage,
		public params: NavParams
    ) {
    	this.user = params.data;
    }

    ionViewDidEnter() {
        try{
            this.stg.getField({
                username: this.user.username,
                key: 'saved'
            }).then(saved => {
                console.log(saved)
                this.saved = saved;
            }).catch(err => {
                console.log(JSON.stringify(err));
            });

            this.stg.getField({
                username: this.user.username,
                key: 'favorites'
            }).then(favorites => {
                console.log(favorites)
                this.favorites = favorites;
            }).catch(err => {
                console.log(JSON.stringify(err));
            });
        }catch(err){
            throw err;
        }
    }


}
