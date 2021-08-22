import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { AppConfig } from './services/app-config';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BaseServiceService } from './services/base-service.service';

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
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppConfig,
    BaseServiceService,
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
