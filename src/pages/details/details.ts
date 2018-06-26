import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { OmdbApi } from '../../api/omdb';

@Component({
    selector:"details-page",
    templateUrl: "details.html"
})
export class DetailsPage{

    movieId:any;
    movieData:any;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public api: OmdbApi
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
        try{
            this.api.getMovieById(this.movieId)
                .subscribe(movie=>{
                    this.movieData = movie;
                    console.log(JSON.stringify(this.movieData));
                });
        }catch(error){
            console.log(error);
        }
    }

}