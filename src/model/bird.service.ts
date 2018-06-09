import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { IAddBird } from './IAddBird';
import { IBirdDetail,IBirdDetailSightings } from './IBirdDetail';
import { Injectable } from '@angular/core';

export interface IBird{
  id: number;
  bird_name: string;
  bird_image: string;
  bird_sightings: string;
  mine: number;
}

interface IValidate{
  status: string;
  id: string;
}

@Injectable()
export class BirdService{
  private url_get:string = "/get/";
  private url_get_detail:string = "/detail/";
  private url_post_add_sighting:string = "/addsighting";
  private url_post_add_bird:string = "/addbird";
  private bird: IBird = {id:0, bird_name: "", bird_image: "", bird_sightings: "", mine: 0};
  private httpClient: HttpClient;

  constructor(private httpclient: HttpClient){
    this.httpClient = httpclient;
  }

  getBirds(id: string): Observable<any>{
    return this.httpClient.get(this.url_get + id);
  }

  getBird(birdId: number): Observable<any>{
    console.log(birdId);

    return this.httpClient.get(this.url_get_detail + birdId);
  }

  addSighting(birdDetailSightings: IBirdDetailSightings): Observable<any>{
    let postData = new FormData();
    postData.append('idAve' , birdDetailSightings.idAve.toString());
    postData.append('lat' , birdDetailSightings.lat.toString());
    postData.append('long' , birdDetailSightings.long.toString());
    postData.append('place' , birdDetailSightings.place);

    return this.httpClient.post<any>(this.url_post_add_sighting, postData);
  }

  addBird(bird: IAddBird): Observable<any>{
    let postData = new FormData();
    postData.append('idUser', bird.idUser.toString());
    postData.append('bird_name', bird.bird_name);
    postData.append('bird_description', bird.bird_description);
    postData.append('place' , bird.place);
    postData.append('lat' , bird.lat);
    postData.append('long' , bird.long);

    console.log(postData);
    return this.httpClient.post<any>(this.url_post_add_bird, postData);
  }
}
