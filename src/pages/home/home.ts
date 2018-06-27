import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';
import { UserStorage } from '../../helpers/userStorage';
import { ToastController} from 'ionic-angular';
import { DetailsPage } from '../details/details';

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
            if(data.Search){
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
            }else{
                this.toastAlert({
                    message: 'No Results!',
                    duration: 1500,
                    position: "bottom",
                });
            }
        });
    }
    fetchLatestMovies() {
        if(this.latestMovies.length > 0) {
            this.latestMovies.some((id,index) => {
                if(index < 5){
                    this.api.getMovieById(id)
                    .subscribe(movie => {
                            this.movies.push(movie);
                    });
                    console.log(this.latestMovies.length)
                    this.latestMovies.shift();
                    console.log("pop!");
                    console.log(this.latestMovies.length);
                }else{
                    return true;
                }
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

    toDetails(id:any){
        this.navCtrl.push(DetailsPage,id);
    }
    doInf(infiniteScroll){
        console.log("infite activated")
        if(this.latestMovies.length > 0){
            setTimeout(() => {
                this.fetchLatestMovies();  
                infiniteScroll.complete();          
            },4000);
        }else{
            setTimeout(()=>{
                console.log("Ran out of latest movies");
                infiniteScroll.complete();  
            },1000);
        }
    }
    
}
