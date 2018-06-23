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
    search: string;
    user: {
        username: string;
        password: string;
    };
    latestMovies = [];
    movies = [];

    ionViewDidLoad() {
        this.storage.getItem(this.user.username)
        .then((user) => {
            this.latestMovies = user.latestMovies;
            if (this.latestMovies.length > 0) {
                this.latestMovies.forEach((id) => {
                    console.log(id)
                    this.api.getMovieById(id).subscribe((data) => {
                        console.log(data)
                        this.movies.push(data);
                    });
                });
            }
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
    }
    // ionViewDidEnter() {
    //     const { latestMovies } = this;
          
    // }
    ionViewWillLeave() {
        this.storage.getItem(this.user.username)
        .then((user) => {
            user.latestMovies = this.latestMovies;
            this.storage.setItem(this.user.username, user);
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
    }
    onSearch() {
        this.movies = [];
        this.api.getMovies(this.search)
        .subscribe((data) => {
            data.Search.forEach((m) => {
                console.log(m.imdbID)
                if(this.latestMovies.length < 20) {
                    this.latestMovies.push(m.imdbID);
                    this.movies.push(m);
                } else {
                    this.latestMovies.shift();
                    this.latestMovies.push(m.imdbID);
                    this.movies.push(m);
                }
            });
        });
    }
    onCancel() {
        this.search = '';
    }

}
