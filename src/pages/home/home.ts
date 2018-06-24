import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';
import { UserStorage } from '../../helpers/userStorage';
import { ToastController} from 'ionic-angular';

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
        public toastCtrl: ToastController,
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
            if(key == "favorites"){
                this.toastAlert({
                    message: 'You have Starred a movie!',
                    duration: 1500,
                    position: "top",
                });
            }else{
                this.toastAlert({
                    message: 'You have Saved a movie!',
                    duration: 1500,
                    position: "top",
                });
            }
        }).catch(err => {
            this.toastAlert({
                message: 'Error',
                duration: 1500,
                position: "top",
            });
        });
    }

    toastAlert({ message, ...rest }) {
		this.toastCtrl.create({ 
			message: message,
			...rest 
		}).present();
    }
    
}
