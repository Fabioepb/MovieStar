import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';
import { UserStorage } from '../../helpers/userStorage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    search: string;
    user: {
        username: string;
        password: string;
    };
    latestMovies = [];
    movies = [];

    constructor( 
        public navCtrl: NavController, 
        public params: NavParams,
        private api: OmdbApi,
        private userStg: UserStorage
    ) {
        this.user = params.data;
    }

    onCancel() {
        this.search = '';
    }
    ionViewDidLoad() {
        this.userStg.getField({
            username: this.user.username,
            key: 'latestMovies'
        }).then(latestMovies => {
            this.latestMovies = latestMovies;
            this.fetchLatestMovies();
        }).catch(err => {
            console.log(JSON.stringify(err));
        });
    }
    ionViewWillLeave() {
        this.userStg.setField({
            username: this.user.username,
            values: {
                latestMovies: this.latestMovies
            }
        }).then(() => {
            // Success
        }).catch(err => {
            // Failure
        })
    }
    onSearch() {
        this.movies = [];
        this.api.getMovies(this.search)
        .subscribe((data) => {
            data.Search.forEach((m) => {
                if(this.latestMovies.length < 30) {
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
    fetchLatestMovies() {
        if(this.latestMovies.length > 0) {
            this.latestMovies.forEach(id => {
                this.api.getMovieById(id)
                .subscribe(movie => {
                    this.movies.push(movie);
                });
            });
        } else {
            console.log('NO HAY IDS')
        }
    }
    addTo(key:string, movieId:string) {
        console.log(key)
        console.log(movieId);
        this.userStg.addValue({
            username: this.user.username,
            key: key,
            value: movieId,
        }).then(() => {
            // Success
        }).catch(err => {
            // Failure
        });
    }
}
