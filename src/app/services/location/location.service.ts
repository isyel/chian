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
  userCoordinates;
  fullAddress = null;

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public zone: NgZone,
    private geolocation: Geolocation
  ) {
    this.userCoordinates = {
      value: 0,
    };
  }

  async getUserCoordinates() {
    try {
      this.userCoordinates = await (
        await this.geolocation.getCurrentPosition({ enableHighAccuracy: true })
      ).coords;
    } catch (error) {
      console.log('Error getting location', error);
    }

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
          this.fullAddress = `${this.userLocationFromLatLng.areasOfInterest[0]},\ 
           ${this.userLocationFromLatLng.thoroughfare},\ 
           ${this.userLocationFromLatLng.subAdministrativeArea},\
            ${this.userLocationFromLatLng.administrativeArea}.\
             ${this.userLocationFromLatLng.postalCode}`;
        })
        .catch((error: any) => {
          console.log('error: ', error);
        });
    } else {
      if (this.userCoordinates.latitude) {
        this.getGeoLocation(
          this.userCoordinates.latitude,
          this.userCoordinates.longitude,
          'reverseGeocode'
        );
      }
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
              this.fullAddress = result.formatted_address;
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

  async forwardGeocode() {
    if (this.platform.is('hybrid')) {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
      };
      await this.nativeGeocoder
        .forwardGeocode(this.fullAddress, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            const coordinates = {
              latitude: +result[0].latitude,
              longitude: +result[0].longitude,
              altitude: this.userCoordinates.altitude,
              altitudeAccuracy: this.userCoordinates.altitudeAccuracy,
              heading: this.userCoordinates.heading,
              accuracy: this.userCoordinates.accuracy,
              speed: this.userCoordinates.speed,
            };
            this.userCoordinates = coordinates;
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
            const coordinates = {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng(),
              altitude: this.userCoordinates.altitude,
              altitudeAccuracy: this.userCoordinates.altitudeAccuracy,
              heading: this.userCoordinates.heading,
              accuracy: this.userCoordinates.accuracy,
              speed: this.userCoordinates.speed,
            };
            this.userCoordinates = coordinates;
            console.log('this.userCoordinates: ', this.userCoordinates);
          });
        } else {
          console.log('Error - ' + results + ' & Status - ' + status);
        }
      });
    }
  }
}
