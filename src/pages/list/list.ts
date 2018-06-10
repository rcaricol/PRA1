import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BirdService } from '../../services/bird.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../services/IUser';
import { ItemPage } from '../item/item';
import { LoginPage } from '../login/login';
import { AddbirdPage } from '../addbird/addbird';
import { MainPage } from '../main/main';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from '../../Loading/loading.service';
import { UserProvider } from './../../providers/user';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class ListPage {
  //private birdService: BirdService;
  public birdList: any;
  private loader: any;
  private loadingService: LoadingService;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpClient: HttpClient,
      private loadingCtrl: LoadingController,
      private userService: UserService,
      private birdService: BirdService,
      private userProvider: UserProvider,
      public viewCtrl: ViewController
    ) {
      this.userProvider.IsSessionAlive().then(isAlive => {
        if (!isAlive){
          this.navCtrl.push(LoginPage);
        }
        console.log("ListPage-->isAlive-->",isAlive);
      });
      this.loadingService = new LoadingService(loadingCtrl,"Loading...");
      this.getBirds();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.viewCtrl.showBackButton(false);
  }

  getBirds(){
    this.userService.get().then(user => {
      console.log("getBirds()-->", user);
      let userId = user.Id;
      console.log("userId", userId);
      this.loadList(userId);
    });
  }

  loadList(userId){
    this.loadingService.present();
    this.birdService.getBirds(userId).subscribe(
      list=>{
        this.birdList = list;
        console.log(this.birdList);
        setTimeout(()=>{
            this.loadingService.dismiss();
        },1000);
      },
      error=>{
        console.log(error);
        this.loadingService.dismiss();
      }
    );
  }

  viewBird(id: number){
    console.log("view id-->" + id);
    this.birdService.getBird(id).subscribe(
      item=>{
        console.log(item[0]);
        this.navCtrl.push(ItemPage, {
          bird: item[0]
        });
      },
      error=>{
        console.log(error);
      }
    );
  }

  main(){
    this.navCtrl.push(MainPage);
  }

  add(){
    this.navCtrl.push(AddbirdPage, {
      from: "list"
    });
  }
}
