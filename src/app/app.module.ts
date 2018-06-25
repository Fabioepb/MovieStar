import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// Imports
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
// Providers
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OmdbApi } from '../api/omdb';
import { UserStorage } from '../helpers/userStorage';
// Declarations, entryComponents
import { MyApp } from './app.component';
import { SavedPage } from '../pages/saved/saved';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PopoverPage } from '../pages/popover/popover';
import { DetailsPage } from '../pages/details/details';

@NgModule({
  declarations: [
    MyApp,
    SavedPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PopoverPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SavedPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PopoverPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    OmdbApi,
    UserStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
