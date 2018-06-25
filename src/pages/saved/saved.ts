import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStorage } from '../../helpers/userStorage';
import { OmdbApi } from '../../api/omdb';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover'

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
    savedmovies = [];
    starredmovies = [];
    option: string = "saved";

    constructor( 
		public navCtrl: NavController,
		public stg: UserStorage,
        public params: NavParams,
        public api: OmdbApi,
        public popCtrl: PopoverController
    ) {
    	this.user = params.data;
    }

    ionViewDidEnter() {
        try{
            this.savedmovies = [];
            this.starredmovies = [];
            this.stg.getField({
                username: this.user.username,
                key: 'saved'
            }).then(saved => {
                this.fetchMovies(saved, this.savedmovies);
            }).catch(err => {
                console.log(JSON.stringify(err));
            });

            this.stg.getField({
                username: this.user.username,
                key: 'favorites'
            }).then(favorites => {
                this.fetchMovies(favorites, this.starredmovies);
            }).catch(err => {
                console.log(JSON.stringify(err));
            });
        }catch(err){
            throw err;
        }
    }

    fetchMovies( ids:any[], moviestr:any[]) {
        if(ids.length > 0) {
            ids.forEach(id => {
                this.api.getMovieById(id)
                .subscribe(movie => {
                    moviestr.push(movie);
                });
            });
        } else {
            console.log('NO HAY IDS')
        }
    }

    presentPopover(ev){
        this.popCtrl.create(PopoverPage).present({
            ev: ev
          });
    }

}
