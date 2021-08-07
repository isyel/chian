import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    public modalController: ModalController,
    private router: Router,
    public commonMethods: CommonMethods
  ) {}

  ngOnInit() {
    this.commonMethods.dismissLoader();
  }

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }

  viewDetails() {
    this.router.navigate(['/order-details']);
  }
}
