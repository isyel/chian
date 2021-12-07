import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { AppConfig } from './services/app-config';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { BaseServiceService } from './services/base-service.service';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { CookieService } from 'ngx-cookie-service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'ios',
    }),
    AppRoutingModule,
    RoundProgressModule,
    IonicStorageModule.forRoot({
      name: 'Chian',
      driverOrder: [
        // eslint-disable-next-line no-underscore-dangle
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AppConfig,
    BaseServiceService,
    Geolocation,
    NativeGeocoder,
    CookieService,
    Clipboard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
