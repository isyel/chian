import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { UserData } from '../user-data';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  progress = 10;
  max = 30;
  stroke = 3;
  radius = 50;
  semicircle = false;
  rounded = false;
  responsive = false;
  clockwise = true;
  color = '#050F44';
  background = '#050F441A';
  duration = 800;
  animation = 'easeOutCubic';
  animationDelay = 0;
  slideOpts: any;
  lastSlide = false;

  constructor(
    private userData: UserData,
    public navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
  }

  async completeTutorial() {
    const isLoggedIn = this.userData.getIsLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/authentication']);
    }
  }

  isAtLastSlide() {
    this.lastSlide = true;
  }

  goToNext() {
    this.slides.slideNext();
    if (this.lastSlide) {
      this.completeTutorial();
    }
  }

  increment(amount = 1) {
    this.progress += amount;
  }
}
