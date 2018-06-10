import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ItemPage } from '../item/item';
import { IBirdDetail } from '../../services/IBirdDetail';
import { UserProvider } from './../../providers/user';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from '../../Loading/loading.service';
import { AlertService } from '../../alert/alert.service';
import { AlertController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-sightings',
  templateUrl: 'sightings.html',
})
export class SightingsPage {
  private bird: IBirdDetail;
  private loadingService: LoadingService;
  private alertService: AlertService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private decimalPipe: DecimalPipe
    ){
      this.loadingService = new LoadingService(loadingCtrl,"Loading...");
      this.alertService = new AlertService(alertCtrl);
      this.loadingService.present();
      this.bird = navParams.get("bird");
      console.log(this.bird);
      this.userProvider.IsSessionAlive().then(isAlive => {
        if (!isAlive){
          this.navCtrl.push(LoginPage);
        }
        console.log("ItemPage-->isAlive-->",isAlive);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SightingsPage');
    this.viewCtrl.showBackButton(false);
    setTimeout(()=>{
        console.log("setTimeout()",this.loadingService);
        this.dismissLoading();
    },3000);
  }

  formatDecimal(number) {
    if (isNaN(number))
      return 0;
    return this.decimalPipe.transform(number, '1.0-5');
   }

  dismissLoading(){
    if(this.loadingService != undefined){
      this.loadingService.dismiss();
    }
  }

  back(){
    this.navCtrl.push(ItemPage, {
      bird: this.bird
    });
  }
}
