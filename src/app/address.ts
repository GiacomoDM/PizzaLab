export class Address {
  name: string;
  lat: number;
  lng: number;

  public getLatLng() {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }

  constructor(name: string, lat: number, lng: number) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
}
