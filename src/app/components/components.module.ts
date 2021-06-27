import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { HeaderComponent } from './header/header.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RoundProgressModule],
  exports: [
    HeaderComponent,
    HeroCardComponent,
    CircularProgressComponent,
    OrderItemComponent,
  ],
  declarations: [
    HeaderComponent,
    HeroCardComponent,
    CircularProgressComponent,
    OrderItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
