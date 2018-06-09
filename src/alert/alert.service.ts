import { AlertController } from 'ionic-angular';

export class AlertService{
  constructor(private alertCtrl: AlertController){

  }

  show(title:string, subTitle:string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
