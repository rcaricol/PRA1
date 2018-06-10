import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { AddsightingPage } from '../pages/addsighting/addsighting';
import { AddbirdPage } from '../pages/addbird/addbird';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { SightingsPage } from '../pages/sightings/sightings';

import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { IonicStorageModule } from '@ionic/storage';

import { UserService } from '../services/user.service';
import { BirdService } from '../services/bird.service';
import { LocalStorageService } from '../storage/local.service';
import { UserProvider } from './../providers/user';
import { GeocoderProvider } from './../providers/geocoder';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    ListPage,
    ItemPage,
    AddsightingPage,
    AddbirdPage,
    ConfigurationPage,
    SightingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    ListPage,
    ItemPage,
    AddsightingPage,
    AddbirdPage,
    ConfigurationPage,
    SightingsPage
  ],
  providers: [
    UserService,
    BirdService,
    LocalStorageService,
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    UserProvider,
    GeocoderProvider,
    DecimalPipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
