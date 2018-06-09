
import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@Injectable()
export class GeocoderProvider{
  constructor(private nativeGeocoder: NativeGeocoder){

  }

  reverse(){
    console.log("reverse()");
    this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
      .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      .catch((error: any) => console.log(error));
  }

  forward(){
    console.log("forward()");
    this.nativeGeocoder.forwardGeocode('Berlin')
      .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
      .catch((error: any) => console.log(error));
  }

}
