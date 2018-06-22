import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    constructor( 
        public navCtrl: NavController, 
        public params: NavParams,
        private api: OmdbApi,
        private storage: NativeStorage
    ) {
        this.user = params.data;
        
    }
    user: {};
    movies = [];

    ionViewDidEnter() {
        this.api.getRandomMovies().subscribe((data) => {
            data.Search.forEach((m) => {
                this.movies.push(m);
            });
        });
    }
    
}
