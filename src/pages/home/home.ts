import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    constructor( 
        public navCtrl: NavController, 
        public params: NavParams,
        private api: OmdbApi
    ) {
        this.userId = params.data;    
    }
    userId: number;

    
}
