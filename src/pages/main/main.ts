import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { AddbirdPage } from '../addbird/addbird';
import { ConfigurationPage } from '../configuration/configuration';
import { IUser } from '../../Model/IUser';
import { AlertService } from '../../alert/alert.service';
import { UserService } from '../../Model/user.service';
import { AlertController } from 'ionic-angular';
import { UserProvider } from './../../providers/user';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  private user: IUser;
  private alertService: AlertService;

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public httpClient: HttpClient,
        private userService: UserService,
        private userProvider: UserProvider,
        public viewCtrl: ViewController
  ) {
    this.alertService = new AlertService(alertCtrl);
    this.userProvider.IsSessionAlive().then(isAlive => {
      if (!isAlive){
        this.navCtrl.push(LoginPage);
      }
      console.log("MainPage-->isAlive-->",isAlive);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.viewCtrl.showBackButton(false);
  }

  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }

  list(){
    this.navCtrl.push(ListPage, {
      user: this.user
    });
  }

  add(){
    this.navCtrl.push(AddbirdPage, {
      from: "main"
    });
  }

  info(){
    this.userProvider.get().then(user => {
      if (user){
        let session: string =
          "<ul>" +
            "<li><label><strong>User:</strong> </label><label>" + user.UserName + "</label></li>" +
            "<li><label><strong>Session Id:</strong> </label><label>" + user.Id + "</label></li>" +
          "</ul>";
        this.alertService.show("Session Information",session);
        console.log("MainPage-->info-->",session);
      }
    });
  }

  configuration(){
    this.navCtrl.push(ConfigurationPage);
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
