import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';

@Component({
    selector:"details-page",
    templateUrl: "details.html"
})
export class DetailsPage{

    movieId:any;
    movieData:any;
    loading:Loading;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public api: OmdbApi,
        public loadCtrl: LoadingController,
    ){
        this.movieId = this.navParams.data;

        this.movieData ={
            Poster:"",
            Title: "PLACEHOLDER TITLE",
            Plot: "N/A",
            Year: "N/A",
            Actors: "N/A",
            Genre: "N/A",
            imdbRating: "N/A"
        }
        
    };

    ionViewWillEnter(){
        this.showLoading();
        try{
            this.api.getMovieById(this.movieId)
                .subscribe(movie=>{
                    this.movieData = movie;
                    console.log(JSON.stringify(this.movieData));                    
                });
            this.dismissLoad();
        }catch(error){
            this.dismissLoad();
            console.log(error);
        }
    }

    showLoading() {
        this.loading = this.loadCtrl.create({
            content: 'Fetching data...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    dismissLoad() {
        this.loading.dismiss();
    }

}