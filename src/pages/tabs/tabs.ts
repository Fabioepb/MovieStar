import { Component } from '@angular/core';
import { SavedPage } from '../saved/saved';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    constructor(
        public storage: NativeStorage,
        public navParams: NavParams
    ) {
        this.user = this.navParams.data;
        
    };
    user: {
        username:string,
        password:string,
    };
    tab1Root = HomePage;
    tab2Root = SavedPage;

    ionViewCanEnter():Promise<void> {
        const { username, password } = this.user;
        return new Promise((res, rej) => {
            this.storage.getItem(username).then((user) => {
                (user.password == password) ? res() : rej();
            }).catch((error) => {
                rej();
            });
        });
    }

    // x():Promise<void> {

    //     return new Promise((res, rej) => {
    //         this.storage.getItem("users").then(users => {
    //             let { username, password } = this.user;
    //             const bool = users.some((user) => {
    //                 console.log(JSON.stringify(user))
    //                 return (username === user.username && password === user.password)
    //             });
    //             bool ? res() : rej();
    //         }).catch(error => {
    //             rej();
    //         });
    //     });
    // }
    
}