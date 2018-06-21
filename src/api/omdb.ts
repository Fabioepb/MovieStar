import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// PREGUNTAR
// export interface Movies {
//     totalResults: number;
// };

@Injectable()
export class OmdbApi {
    constructor(
        public http: HttpClient
    ) {}
    url: string = 'http://www.omdbapi.com/?apikey=4dcf5341&s';

    getRandomMovies():Observable<any> {
        return this.http.get<any>(`${this.url}&s=as`);
    }

}