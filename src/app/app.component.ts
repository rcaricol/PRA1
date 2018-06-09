import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { AddsightingPage } from '../pages/addsighting/addsighting';
import { AddbirdPage } from '../pages/addbird/addbird';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { SightingsPage } from '../pages/sightings/sightings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
