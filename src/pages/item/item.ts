import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { IBirdDetail } from '../../Model/IBirdDetail';
import { AddsightingPage } from '../addsighting/addsighting';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { SightingsPage } from '../sightings/sightings';
import { UserProvider } from './../../providers/user';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from '../../Loading/loading.service';
import { AlertService } from '../../alert/alert.service';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  private bird: IBirdDetail;
  private loadingService: LoadingService;
  private alertService: AlertService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController
    ) {

    this.loadingService = new LoadingService(loadingCtrl,"Loading...");
    this.loadingService.present();
    this.alertService = new AlertService(alertCtrl);
    this.bird = navParams.get("bird");
    console.log(this.bird);
    this.userProvider.IsSessionAlive().then(isAlive => {
      if (!isAlive){
        this.navCtrl.push(LoginPage);
      }
      console.log("ItemPage-->isAlive-->",isAlive);
    });

    setTimeout(()=>{
        this.dismissLoading();
    },1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
    this.viewCtrl.showBackButton(false);
  }

  add(){
    this.navCtrl.push(AddsightingPage, {
      bird: this.bird
    });
  }

  dismissLoading(){
    if(this.loadingService != undefined){
      this.loadingService.dismiss();
    }
  }

  sightings(){
    console.log("bird", this.bird);
    this.navCtrl.push(SightingsPage, {
      bird: this.bird
    });
  }

  list(){
    this.navCtrl.push(ListPage);
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
