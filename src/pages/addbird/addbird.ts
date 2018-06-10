import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { AlertService } from '../../alert/alert.service';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BirdService } from '../../services/bird.service';
import { LoadingService } from '../../Loading/loading.service';
import { IUser } from '../../services/IUser';
import { IAddBird } from '../../services/IAddBird';
import { IBirdDetail,IBirdDetailSightings } from '../../services/IBirdDetail';
import { ListPage } from '../list/list';
import { MainPage } from '../main/main';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from './../../providers/user';

@IonicPage()
@Component({
  selector: 'page-addbird',
  templateUrl: 'addbird.html',
})
export class AddbirdPage {
  private birdService: BirdService;
  private group : FormGroup;
  private user: IUser;
  public bird: IAddBird = {
    idUser: "",
    bird_name: "",
    bird_description: "",
    place: "",
    lat: "",
    long: "",
    placeVisible: false
  };
  private sightings: IBirdDetailSightings = {
    id: 0,
    idAve: 0,
    place:"",
    lat: "",
    long: ""
  };
  private alertService: AlertService;
  private loadingService: LoadingService;
  private from: string;
  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                private formBuilder: FormBuilder,
                public httpClient: HttpClient,
                private alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                private userProvider: UserProvider,
                private geolocation: Geolocation,
                public viewCtrl: ViewController
              ) {
              this.group = this.formBuilder.group({
                   name: ['', Validators.required],
                   description: ['', [Validators.required, Validators.minLength(20)]],
                   placeVisible: new FormControl('', Validators.compose([this.validateCheck])),
                   place: new FormControl('', Validators.compose([this.validateLocation])),
                   lat: [''],
                   long: ['']
              });
              this.birdService = new BirdService(this.httpClient);
              this.alertService = new AlertService(alertCtrl);
              console.log(this.bird.placeVisible);
              this.from = navParams.get("from");
              console.log("from", this.from);
              this.userProvider.IsSessionAlive().then(isAlive => {
                if (!isAlive){
                  this.navCtrl.push(LoginPage);
                }
                console.log("AddbirdPage-->isAlive-->",isAlive);
              });
              this.userProvider.get().then(user => {
                if (user){
                  this.user = user;
                  this.lastBird();
                }
              });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbirdPage');
    this.viewCtrl.showBackButton(false);
    this.getLocation();
  }

  validateCheck(formControl: FormControl){
    console.log("fc.value.check",formControl.value);

    if (formControl.parent == null){
      return (null);
    }

    if (!formControl.value){
      return (null);
    }

    var place = formControl.parent.controls['place'];
    console.log("fc.parent.value.place",place.value);

    if (place.value == undefined || place.value.length == 0  || place.value == ""){
        return ({"place is null": true});
    }

    return (null);
  }

  validateLocation(formControl: FormControl){
    console.log("fc.value.place",formControl.value);

    if (formControl.parent == null){
      return (null);
    }

    var placeVisible = formControl.parent.controls['placeVisible'];

    if (!placeVisible.value){
      return (null);
    }

    if (formControl.value == undefined || formControl.value.length ==0  || formControl.value == ""){
        return ({"place is null": true});
    }

    //Is necesary for validate check value.
    placeVisible.errors = null;
    placeVisible.status = "VALID";
    return (null);
  }

  add(){
    console.log(this.group.value);
    this.bird.idUser = this.user.Id;
    console.log(this.bird);
    this.loadingService = new LoadingService(this.loadingCtrl,"Saving...");
    this.loadingService.present();
    this.birdService.addBird(this.bird).subscribe(
        validate=>{
          console.log(validate);
          if (validate.status === "OK"){
              this.loadingService.dismiss();
              this.alertService.show("Process Confirmation","Save successful a new Bird!!");
              this.navCtrl.push(ListPage, {
                user: this.user
              });
          }else{
            console.log(validate);
            this.alertService.show("Process error","No save data!!");
          }
        },
        error=>{
          this.loadingService.dismiss();
          console.log(error);
        }
    );
  }

  map(idAve: number){
    this.sightings.idAve = idAve;
    this.sightings.place = this.bird.place;
    this.sightings.lat  = this.bird.lat;
    this.sightings.long = this.bird.long;
  }

  lastBird(){

    this.birdService.getBirds(this.user.Id).subscribe(
      list=>{
        //console.log(list);
        //console.log(list[list.length-1]);
        return list[list.length-1];
      },
      error=>{
        console.log(error);
      }
    );
  }

  getLocation(){
    this.loadingService = new LoadingService(this.loadingCtrl,"Get position ...");
    this.loadingService.present();
    this.geolocation.getCurrentPosition().then((res) => {
      console.log(res);
      let location='lat '+ res.coords.latitude +' lang '+res.coords.longitude;
      this.bird.lat = res.coords.latitude.toString();
      this.bird.long = res.coords.longitude.toString();
      this.loadingService.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadingService.dismiss();
    });
  }

  back(){
    if (this.from === "main")
    {
      this.navCtrl.push(MainPage);
    }else{
      if (this.from === "list")
      {
        this.navCtrl.push(ListPage);
      }
    }
  }

}
