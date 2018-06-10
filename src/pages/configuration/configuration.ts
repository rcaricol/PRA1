import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';
import { AlertService } from '../../alert/alert.service';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from '../../Loading/loading.service';

import { IUser } from '../../services/IUser';
import { UserProvider } from './../../providers/user';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  private user: IUser;
  private rememberPassword: boolean = false;
  private alertService: AlertService;
  private loadingService: LoadingService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    public viewCtrl: ViewController) {

    this.loadingService = new LoadingService(loadingCtrl,"Loading...");
    this.alertService = new AlertService(alertCtrl);
    this.userProvider.IsSessionAlive().then(isAlive => {
      if (!isAlive){
        this.navCtrl.push(LoginPage);
      }
      console.log("MainPage-->isAlive-->",isAlive);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
    this.viewCtrl.showBackButton(false);
    this.load();
  }

  load(){
    this.loadingService.present();
    this.userProvider.get().then(user => {
      if (user){
        this.user = user;
        this.rememberPassword = this.user.RememberPassword;
        console.log("load", this.user);
      }
      setTimeout(()=>{
            this.loadingService.dismiss();
      },1000);
    });
  }

  save(){
    console.log("rememberPassword", this.rememberPassword);
    this.user.RememberPassword = this.rememberPassword;
    this.userProvider.set(this.user);
    console.log("user", this.user);
    this.alertService.show("Process Confirmation","Configuration saves successfully!!");
  }

  main(){
    this.navCtrl.push(MainPage);
  }

  logout(){
    this.userProvider.get().then(user => {
      if (user){
        this.alertService.show("Session Information","You are now signed out");
        user.IsActive = false;
        this.userProvider.set(user);
        this.navCtrl.push(LoginPage);
      }
    });
  }
}
