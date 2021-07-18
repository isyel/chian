import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserData } from '../user-data';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  currentSlide = 1;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  showSkip = true;

  constructor(private userData: UserData, public navCtrl: NavController) {}

  ngOnInit() {}

  completeTutorial() {
    this.userData.setHasSeenTutorial();
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
}
