import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './avatar/avatar.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { HeroCardComponent } from './hero-card/hero-card.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [
    AvatarComponent,
    ButtonComponent,
    HeaderComponent,
    HeroCardComponent,
  ],
})
export class Tab1PageModule {}
