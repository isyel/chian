/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { Coordinates, Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
declare let google: {
  maps: {
    Geocoder: new () => any;
    LatLng: new (arg0: number, arg1: number) => any;
    GeocoderStatus: { OK: any };
  };
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  userLocationFromLatLng: NativeGeocoderResult = null;
  userCity: any;
  latLngResult: any;
  userCoordinates: Coordinates;
  fullAddress = '';

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public zone: NgZone,
    private geolocation: Geolocation
  ) {}

  getUserCoordinates() {
    this.geolocation
      .getCurrentPosition({ enableHighAccuracy: true })
      .then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log('getCurrentPosition response', resp);
        this.userCoordinates = resp.coords;
        console.log('this.userCoordinates', this.userCoordinates);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
    //  If you want a continuous tracking of user location, use can you this
    // const watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    // });
  }

  reverseGeocode() {
    if (this.platform.is('hybrid')) {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
      };
      this.nativeGeocoder
        .reverseGeocode(
          this.userCoordinates.latitude,
          this.userCoordinates.longitude,
          options
        )
        .then((result: NativeGeocoderResult[]) => {
          console.log('result: ', result);
          this.userLocationFromLatLng = result[0];
          this.fullAddress = `${this.userLocationFromLatLng.areasOfInterest[0]}, 
            ${this.userLocationFromLatLng.thoroughfare}, 
            ${this.userLocationFromLatLng.subAdministrativeArea}, 
            ${this.userLocationFromLatLng.administrativeArea}.
            ${this.userLocationFromLatLng.postalCode}`;
        })
        .catch((error: any) => {
          console.log('error: ', error);
        });
    } else {
      this.getGeoLocation(
        this.userCoordinates.latitude,
        this.userCoordinates.longitude,
        'reverseGeocode'
      );
    }
  }

  async getGeoLocation(lat: number, lng: number, type?: string) {
    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      await geocoder.geocode(request, (results: any[], status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          this.zone.run(() => {
            if (result != null) {
              console.log('In getGeoLocation - result: ', result);
              this.userCity = result.formatted_address;
              if (type === 'reverseGeocode') {
                this.latLngResult = result.formatted_address;
              }
            } else {
              console.log('In getGeoLocation - Result is Null');
            }
          });
        } else {
          console.log('In getGeoLocation - GeocoderStatus not OK');
        }
      });
    }
  }

  forwardGeocode() {
    if (this.platform.is('hybrid')) {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
      };
      this.nativeGeocoder
        .forwardGeocode(this.fullAddress, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            this.userCoordinates.latitude = +result[0].latitude;
            this.userCoordinates.longitude = +result[0].longitude;

            console.log(
              '(cordova) Coordinates from address: ',
              this.userCoordinates
            );
          });
        })
        .catch((error: any) => console.log('error in cordova: ', error));
    } else {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.fullAddress }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.zone.run(() => {
            this.userCoordinates.latitude = results[0].geometry.location.lat();
            this.userCoordinates.longitude = results[0].geometry.location.lng();
            console.log('Coordinates from address: ', this.userCoordinates);
          });
        } else {
          alert('Error - ' + results + ' & Status - ' + status);
        }
      });
    }
  }
}
