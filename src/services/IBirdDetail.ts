export interface IBirdDetail{
  bird_description: string;
  bird_image: string;
  bird_name: string;
  bird_sightings: number;
  id: number;
  idUser: number;
  sightings_list: [IBirdDetailSightings];
}

export interface IBirdDetailSightings{
  id: number;
  idAve: number;
  lat: string;
  long: string;
  place: string;
}
