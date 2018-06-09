import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { IBirdDetail,IBirdDetailSightings } from '../../Model/IBirdDetail';
import { AlertService } from '../../alert/alert.service';
import { LoadingService } from '../../Loading/loading.service';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BirdService } from '../../Model/bird.service';
import { ItemPage } from '../item/item';
import { LoginPage } from '../login/login';
import { UserProvider } from './../../providers/user';

@IonicPage()
@Component({
  selector: 'page-addsighting',
  templateUrl: 'addsighting.html',
})
export class AddsightingPage {
  private birdService: BirdService;
  private bird: IBirdDetail;
  private group : FormGroup;
  private sightings: IBirdDetailSightings = {
    id: 0,
    idAve: 0,
    place:"",
    lat: "",
    long: ""
  };
  private alertService: AlertService;
  private loadingService: LoadingService;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public httpClient: HttpClient,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private userProvider: UserProvider,
              public viewCtrl: ViewController
            ) {
    this.bird = navParams.get("bird");
    console.log(this.bird);
    this.group = this.formBuilder.group({
      place: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.alertService = new AlertService(alertCtrl);
    this.birdService = new BirdService(this.httpClient);

    this.userProvider.IsSessionAlive().then(isAlive => {
      if (!isAlive){
        this.navCtrl.push(LoginPage);
      }
      console.log("AddsightingPage-->isAlive-->",isAlive);
    });

    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsightingPage');
    this.viewCtrl.showBackButton(false);
  }

  add(){
    console.log(this.group.value);
    this.sightings.idAve = this.bird.id;
    console.log(this.sightings);
    this.birdService.addSighting(this.sightings).subscribe(
      validate=>{
        if (validate.status === "OK"){
            this.alertService.show("Process Confirmation","Save successful a new Sighting!!");
            this.birdService.getBird(this.bird.id).subscribe(
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
        else{
          console.log(validate);
          this.alertService.show("Process error","No save data!!");
        }

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
      this.sightings.place = "";
      this.sightings.lat = res.coords.latitude.toString();
      this.sightings.long = res.coords.longitude.toString();
      this.loadingService.dismiss();
      this.nativeGeocoder.reverseGeocode(res.coords.latitude, res.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadingService.dismiss();
    });
  }

  back(){
    this.navCtrl.push(ItemPage, {
      bird: this.bird
    });
  }
}
